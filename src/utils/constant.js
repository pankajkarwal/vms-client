export default{
    LABEL_CONSTANTS:{
        DASHBOARD: {
            APP_NAME:'VMS'
        }
    },
    APP_ROUTES:{
        GET_VISITOR:'visitors/fetch',
        ARTICLE_LIST:'article/list',
        LOGIN:'/',
        UPDATE_VISTOR:'visitors/update',
        EDIT_VISITOR:'visitors/edit',
    },
    PAGES:{
        VISITOR:{
            ADD_VISITOR_BUTTON_TEXT:'Add Visitor',
            AEDIT_VISITOR_BUTTON_TEXT:'Edit Visitor',
            ADD_VISTOR_MODAL_TITLE:'Create Visitor',
            EDIT_VISTOR_MODAL_TITLE:'Edit Visitor'
        }
    },
    SERVICES_ROUTES : {
        FETCH_ALL_VISITOR:'visitors/fetch',
        ADD_VISITOR:'visitors/add',
        SINGLE_VISITOR:'visitors/get',
        UPDATE_VISITOR: 'visitors/update:id'
    }
}