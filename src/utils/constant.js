export default{
    LABEL_CONSTANTS:{
        DASHBOARD: {
            APP_NAME:'VMS- Visitor Management System'
        },
        VISITOR:{
            BTN_ADD_VISITOR:'Add Visitor'
        },
        COUNTRY:{
            BTN_ADD_VISITOR:'Add Country'
        },
        CITY:{
            BTN_ADD_VISITOR:'Add City'
        }
    },
    APP_ROUTES:{
        LOGIN:'/',
        ARTICLE_LIST:'article/list',
        VISITOR:{
            GET_VISITOR:'visitors',
            UPDATE_VISTOR:'update',
            EDIT_VISITOR:'edit/:id',
            ADD_VISITOR: 'add'
        },
        COUNTRY:{
            GET_COUNTRY:'country',
            UPDATE_COUNTRY:'update',
            EDIT_COUNTRY:'edit/:id',
            ADD_COUNTRY: 'add'
        },
        CITY:{
            GET_CITY:'city',
            UPDATE_CITY:'update',
            EDIT_CITY:'edit/:id',
            ADD_CITY: 'add'
        },
    },
    PAGES:{
        VISITOR:{
            ADD_VISITOR_BUTTON_TEXT:'Add Visitor',
            EDIT_VISITOR_BUTTON_TEXT:'Edit Visitor',
            ADD_VISTOR_MODAL_TITLE:'Create Visitor',
            EDIT_VISTOR_MODAL_TITLE:'Edit Visitor',
            LIST_PAGE_CAPTION:'List of Visitor'
        },
        COUNTRY:{
            ADD_COUNTRY_BUTTON_TEXT:'Add Country',
            EDIT_COUNTRY_BUTTON_TEXT:'Edit Country',
            ADD_COUNTRY_MODAL_TITLE:'Create Country',
            EDIT_COUNTRY_MODAL_TITLE:'Edit Country',
            LIST_PAGE_CAPTION:'List of Country'
        },
        CITY:{
            ADD_CITY_BUTTON_TEXT:'Add City',
            EDIT_CITY_BUTTON_TEXT:'Edit City',
            ADD_CITY_MODAL_TITLE:'Create City',
            EDIT_CITY_MODAL_TITLE:'Edit City',
            LIST_PAGE_CAPTION:'List of City'
        }
    },
    SERVICES_ROUTES : {
        VISITOR:{
            FETCH_ALL_VISITOR:'visitors/fetch',
            ADD_VISITOR:'visitors/add',
            SINGLE_VISITOR:'visitors/get',
            UPDATE_VISITOR: 'visitors/update',
            DELETE_VISITOR: 'visitors/delete/:id'
        },
        COUNTRY:{
            FETCH_ALL_COUNTRY:'country/fetch',
            ADD_COUNTRY:'country/add',
            SINGLE_COUNTRY:'country/get',
            UPDATE_COUNTRY: 'country/update',
            DELETE_COUNTRY: 'country/delete/:id'
        },
        CITY:{
            FETCH_ALL_CITY:'city/fetch',
            ADD_CITY:'city/add',
            SINGLE_CITY:'city/get',
            UPDATE_CITY: 'city/update',
            DELETE_CITY: 'city/delete/:id'
        }

    },
    ERRORS:{
        DEFAULT_ERROR:"Internal Server Error"
    },
    SUCCESS:{
        VISITOR:{
            ADDED_VISITOR:"Visitor added sucessfully",
            UPDATED_VISITOR:"Visitor updated sucessfully",
            DELETED_VISITOR:"Visitor deleted sucessfully"    
        },
        COUNTRY:{
            ADDED_COUNTRY:"Country added sucessfully",
            UPDATED_COUNTRY:"Country updated sucessfully",
            DELETED_COUNTRY:"Country deleted sucessfully"  
        },
        CITY:{
            ADDED_CITY:"City added sucessfully",
            UPDATED_CITY:"City updated sucessfully",
            DELETED_CITY:"City deleted sucessfully"  
        }
    },
    MODELS:{
        VISITOR:{
            DELETE_HEADER:" Visitor Delete?",
            DELETE_TEXT:"Are you sure you want to delete this visitor record ?"
        },
        COUNTRY:{
            DELETE_HEADER:" Country Delete?",
            DELETE_TEXT:"Are you sure you want to delete this country record ?"
        },
        CITY:{
            DELETE_HEADER:" City Delete?",
            DELETE_TEXT:"Are you sure you want to delete this city record ?"
        }
    },
   TABLE:{
        DEFAULT_PAGE_SIZE:10,
        DEFAULT_ROWS_PER_PAGE:10
    }
}