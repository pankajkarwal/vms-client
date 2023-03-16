export default{
    LABEL_CONSTANTS:{
        DASHBOARD: {
            APP_NAME:'VMS'
        }
    },
    APP_ROUTES:{
        GET_VISITOR:'visitors',
        ARTICLE_LIST:'article/list',
        LOGIN:'/',
        UPDATE_VISTOR:'update',
        EDIT_VISITOR:'edit/:id',
        ADD_VISITOR: 'add'
    },
    PAGES:{
        VISITOR:{
            ADD_VISITOR_BUTTON_TEXT:'Add Visitor',
            EDIT_VISITOR_BUTTON_TEXT:'Edit Visitor',
            ADD_VISTOR_MODAL_TITLE:'Create Visitor',
            EDIT_VISTOR_MODAL_TITLE:'Edit Visitor'
        }
    },
    SERVICES_ROUTES : {
        FETCH_ALL_VISITOR:'visitors/fetch',
        ADD_VISITOR:'visitors/add',
        SINGLE_VISITOR:'visitors/get',
        UPDATE_VISITOR: 'visitors/update'
    },
    ERRORS:{
        DEFAULT_ERROR:"Internal Server Error"
    },
    SUCCESS:{
        ADDED_VISITOR:"Visitor added sucessfully",
        UPDATED_VISITOR:"Visitor updated sucessfully",
        DELETED_VISITOR:"Visitor deleted sucessfully"

    },
    MODELS:{
        VISITOR:{
            DELETE_HEADER:" Visitor Delete?",
            DELETE_TEXT:"Are you sure you want to delete this visitor record ?"
        }
    },
   TABLE:{
        DEFAULT_PAGE_SIZE:10,
        DEFAULT_ROWS_PER_PAGE:10
    }
}