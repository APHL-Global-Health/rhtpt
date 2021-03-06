Vue.http.headers.common['X-CSRF-TOKEN'] = $("#token").attr("value");
Vue.http.interceptors.unshift(function(request, next) {
    next(function(response) {
        if(typeof response.headers['content-type'] != 'undefined') {
            response.headers['Content-Type'] = response.headers['content-type'];
        }
    });
});
new Vue({

    el: '#manage-lot',

    data: {
        lots: [],
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
        newLot : {'round_id':'','lot':'','tester_id':[]},
        fillLot : {'round_id':'','lot':'','tester_id':[],'id':''},
        rounds: [],
        loading: false,
        error: false,
        query: ''
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

    mounted : function(){
		this.getVueLots(this.pagination.current_page);
        this.loadRounds();
    },

    methods : {

        getVueLots: function(page){
            this.$http.get('/vuelots?page='+page).then((response) => {
                if(response.data.data)
                {
                    this.lots = response.data.data.data;
                    this.pagination = response.data.pagination;
                }
                else
                {
                    swal("No data found for PT lots.", "", "info");
                }
            });
        },

        createLot: function(scope){
            this.$validator.validateAll(scope).then(() => {
          		var input = this.newLot;
          		this.$http.post('/vuelots',input).then((response) => {
                
                if(response.data == '1')
                {
                    this.error = response.data;
                    toastr.error('Select a valid PT Round', {timeOut: 5000});
                }
                else if(response.data == '2')
                {
                    this.error = response.data;
                    toastr.error('This Lot already exists', {timeOut: 5000});
                }
                else
                {                
        		    this.changePage(this.pagination.current_page);
          			this.newLot = {'round_id':'','lot':'','tester_id':[]};
          			$("#create-lot").modal('hide');
          			toastr.success('Lot Created Successfully.', 'Success Alert', {timeOut: 5000});
                }
          		}, (response) => {
      			    this.formErrors = response.data;
                });
      	    }).catch(() => {
                toastr.error('Please fill in the fields as required.', 'Validation Failed', {timeOut: 5000});
            });
      	},

        deleteLot: function(lot){
            this.$http.delete('/vuelots/'+lot.id).then((response) => {
                this.changePage(this.pagination.current_page);
                toastr.success('Lot Disabled Successfully.', 'Success Alert', {timeOut: 5000});
            });
        },

        restoreLot: function(lot){
            this.$http.patch('/vuelots/'+lot.id+'/restore').then((response) => {
                this.changePage(this.pagination.current_page);
                toastr.success('Lot Restored Successfully.', 'Success Alert', {timeOut: 5000});
            });
        },

        editLot: function(lot){
            this.fillLot.round_id = lot.round_id;
            this.fillLot.id = lot.id;
            this.fillLot.lot = lot.lot;
            this.fillLot.tester_id = lot.tester_id.replace(/\s/g, '').split(',');
            $("#edit-lot").modal('show');
        },

        updateLot: function(id, scope){
            this.$validator.validateAll(scope).then(() => {
                var input = this.fillLot;
                this.$http.put('/vuelots/'+id,input).then((response) => {
                    this.changePage(this.pagination.current_page);
                    this.fillLot = {'round_id':'','lot':'','tester_id':[],'id':''};
                    $("#edit-lot").modal('hide');
                    toastr.success('Lot Updated Successfully.', 'Success Alert', {timeOut: 5000});
                }, (response) => {
                    this.formErrorsUpdate = response.data;
                });
            }).catch(() => {
                toastr.error('Please fill in the fields as required.', 'Validation Failed', {timeOut: 5000});
            });
        },

        loadRounds: function() {
            this.$http.get('/rnds').then((response) => {
                this.rounds = response.data;
            }, (response) => {
                  // console.log(response);
            });
        },

        changePage: function (page) {
            this.pagination.current_page = page;
            this.getVueLots(page);
        },

        search: function() {
            // Clear the error message.
            this.error = '';
            // Empty the lots array so we can fill it with the new lots.
            this.lots = [];
            // Set the loading property to true, this will display the "Searching..." button.
            this.loading = true;

            // Making a get request to our API and passing the query to it.
            this.$http.get('/api/search_lot?q=' + this.query).then((response) => {
                // If there was an error set the error message, if not fill the lots array.
                if(response.data.error)
                {
                    this.error = response.data.error;
                    toastr.error(this.error, 'Search Notification', {timeOut: 5000});
                }
                else
                {
                    this.lots = response.data.data.data;
                    this.pagination = response.data.pagination;
                    toastr.success('The search results below were obtained.', 'Search Notification', {timeOut: 5000});
                }
                // The request is finished, change the loading to false again.
                this.loading = false;
                // Clear the query.
                this.query = '';
            });
        }
    }
});