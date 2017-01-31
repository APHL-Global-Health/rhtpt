Vue.http.headers.common['X-CSRF-TOKEN'] = $("#token").attr("value");

new Vue({

  el: '#manage-material',

  data: {
    materials: [],
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
    newMaterial : {'batch_no':'','date_prepared':'','expiry_date':'','material_type':'','original_source':'','date_collected':'','prepare_by':''},
    fillMaterial : {'batch_no':'','date_prepared':'','expiry_date':'','material_type':'','original_source':'','date_collected':'','prepare_by':'','id':''}
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
  		this.getVueMaterials(this.pagination.current_page);
  },

  methods : {

        getVueMaterials: function(page){
          this.$http.get('/vuematerials?page='+page).then((response) => {
            this.$set('materials', response.data.data.data);
            this.$set('pagination', response.data.pagination);
          });
        },

        createMaterial: function(){
		  var input = this.newMaterial;
		  this.$http.post('/vuematerials',input).then((response) => {
		    this.changePage(this.pagination.current_page);
			this.newMaterial = {'batch_no':'','date_prepared':'','expiry_date':'','material_type':'','original_source':'','date_collected':'','prepare_by':''};
			$("#create-material").modal('hide');
			toastr.success('Material Created Successfully.', 'Success Alert', {timeOut: 5000});
		  }, (response) => {
			this.formErrors = response.data;
	    });
	},

      deleteMaterial: function(material){
        this.$http.delete('/vuematerials/'+material.id).then((response) => {
            this.changePage(this.pagination.current_page);
            toastr.success('Material Deleted Successfully.', 'Success Alert', {timeOut: 5000});
        });
      },

      editMaterial: function(material){
          this.fillMaterial.batch_no = material.batch_no;
          this.fillMaterial.id = material.id;
          this.fillMaterial.date_prepared = material.date_prepared;
          this.fillMaterial.expiry_date = material.expiry_date;
          this.fillMaterial.material_type = material.material_type;
          this.fillMaterial.original_source = material.original_source;
          this.fillMaterial.date_collected = material.date_collected;
          this.fillMaterial.prepared_by = material.prepared_by;
          $("#edit-material").modal('show');
      },

      updateMaterial: function(id){
        var input = this.fillMaterial;
        this.$http.put('/vuematerials/'+id,input).then((response) => {
            this.changePage(this.pagination.current_page);
            this.fillMaterial = {'batch_no':'','date_prepared':'','expiry_date':'','material_type':'','original_source':'','date_collected':'','prepare_by':'','id':''};
            $("#edit-material").modal('hide');
            toastr.success('Material Updated Successfully.', 'Success Alert', {timeOut: 5000});
          }, (response) => {
              this.formErrorsUpdate = response.data;
          });
      },

      changePage: function (page) {
          this.pagination.current_page = page;
          this.getVueMaterials(page);
      }

  }

});