Vue.http.headers.common['X-CSRF-TOKEN'] = $("#token").attr("value");

new Vue({

  el: '#manage-round',

  data: {
    rounds: [],
    pagination: {
        total: 0, 
        per_page: 2,
        from: 1, 
        to: 0,
        current_page: 1
      },
    offset: 4,
    formErrors:{},
    formErrorsUpdate:{},
    newRound : {'name':'','description':'','start_date':'','end_date':''},
    fillRound : {'name':'','description':'','start_date':'','end_date':'','id':''},
    loading: false,
    error: false,
    query: '',
    participants: [],
    psrch: '',
    enrollments: [],
    esrch: ''
  },

  computed: {
        isActived: function () {
            return this.pagination.current_page;
        },
        pagesNumber: function () {
            if (!this.pagination.to) {
                return [];
            }
            var from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }
            var to = from + (this.offset * 2);
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }
            var pagesArray = [];
            while (from <= to) {
                pagesArray.push(from);
                from++;
            }
            return pagesArray;
        }
    },

  ready : function(){
  		this.getVueRounds(this.pagination.current_page);
        this.loadParticipants();
        this.loadEnrollments();
  },

  methods : {

        getVueRounds: function(page){
          this.$http.get('/vuerounds?page='+page).then((response) => {
            this.$set('rounds', response.data.data.data);
            this.$set('pagination', response.data.pagination);
          });
        },

        createRound: function(){
		  var input = this.newRound;
		  this.$http.post('/vuerounds',input).then((response) => {
		    this.changePage(this.pagination.current_page);
			this.newRound = {'name':'','description':'','start_date':'','end_date':''};
			$("#create-round").modal('hide');
			toastr.success('Round Created Successfully.', 'Success Alert', {timeOut: 5000});
		  }, (response) => {
			this.formErrors = response.data;
	    });
	},

      deleteRound: function(round){
        this.$http.delete('/vuerounds/'+round.id).then((response) => {
            this.changePage(this.pagination.current_page);
            toastr.success('Round Deleted Successfully.', 'Success Alert', {timeOut: 5000});
        });
      },

      restoreRound: function(round){
        this.$http.patch('/vuerounds/'+round.id+'/restore').then((response) => {
            this.changePage(this.pagination.current_page);
            toastr.success('Round Restored Successfully.', 'Success Alert', {timeOut: 5000});
        });
      },

      editRound: function(round){
          this.fillRound.name = round.name;
          this.fillRound.id = round.id;
          this.fillRound.description = round.description;
          this.fillRound.start_date = round.start_date;
          this.fillRound.end_date = round.end_date;
          $("#edit-round").modal('show');
      },

      updateRound: function(id){
        var input = this.fillRound;
        this.$http.put('/vuerounds/'+id,input).then((response) => {
            this.changePage(this.pagination.current_page);
            this.fillRound = {'name':'','description':'','start_date':'','end_date':'','id':''};
            $("#edit-round").modal('hide');
            toastr.success('Round Updated Successfully.', 'Success Alert', {timeOut: 5000});
          }, (response) => {
              this.formErrorsUpdate = response.data;
          });
      },

      changePage: function (page) {
          this.pagination.current_page = page;
          this.getVueRounds(page);
      },

      search: function() {
        // Clear the error message.
        this.error = '';
        // Empty the rounds array so we can fill it with the new rounds.
        this.rounds = [];
        // Set the loading property to true, this will display the "Searching..." button.
        this.loading = true;

        // Making a get request to our API and passing the query to it.
        this.$http.get('/api/search_round?q=' + this.query).then((response) => {
            // If there was an error set the error message, if not fill the rounds array.
            if(response.data.error)
            {
                this.error = response.data.error;
                toastr.error(this.error, 'Search Notification', {timeOut: 5000});
            }
            else
            {
                this.rounds = response.data.data.data;
                this.pagination = response.data.data.pagination;
                toastr.success('The search results below were obtained.', 'Search Notification', {timeOut: 5000});
            }
            // The request is finished, change the loading to false again.
            this.loading = false;
            // Clear the query.
            this.query = '';
        });
    },
      srchEnrol: function() {
        // Clear the error message.
        this.error = '';
        // Empty the participants array so we can fill it with the new participants.
        this.participants = [];
        // Set the loading property to true, this will display the "Searching..." button.
        this.loading = true;

        // Making a get request to our API and passing the query to it.
        this.$http.get('/api/search_parts?q=' + this.psrch).then((response) => {
            // If there was an error set the error message, if not fill the rounds array.
            if(response.data.error)
            {
                this.error = response.data.error;
                toastr.error(this.error, 'Search Notification', {timeOut: 5000});
            }
            else
            {
                this.participants = response.data.data.data;
                this.pagination = response.data.data.pagination;
                toastr.success('The search results below were obtained.', 'Search Notification', {timeOut: 5000});
            }
            // The request is finished, change the loading to false again.
            this.loading = false;
            // Clear the query.
            this.psrch = '';
        });
    },

      loadParticipants: function() {
        this.$http.get('/parts').then((response) => {
            this.participants = response.data.data.data;
            console.log(response.data.data.data);

        }, (response) => {
            console.log(response);
        });
      },
      enrolParticipants: function(){
		    let myForm = document.getElementById('partFrm');
            let formData = new FormData(myForm);
            this.$http.post('/enrol', formData).then((response) => {
                this.changePage(this.pagination.current_page);
                $("#enrol-participants").modal('hide');
                toastr.success('Participant(s) Enrolled Successfully.', 'Success Alert', {timeOut: 5000});
            }, (response) => {
                this.formErrors = response.data;
            });
	  },
      loadEnrollments: function(round) {
        this.$http.get('/enrolled/'+round.id).then((response) => {
            this.enrolments = response.data.data.data;
            $("#enrolled-participants").modal('show');

        }, (response) => {
            console.log(response);
        });
      },
  }

});
//  Normal js
//  Triggered when modal is about to be shown
$('#enrol-participants').on('show.bs.modal', function(e) 
{
    //  Get round-id of the clicked element
    var id = $(e.relatedTarget).data('fk');
    console.log(id);
    //  Populate the hidden field
    //$( "#shipment-id" ).val(id);
    $( "#round-id" ).attr('value', id);
    $( "#round-id" ).trigger('change');
    console.log($("#round-id").val());
});