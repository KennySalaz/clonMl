export const initialState = {
    addCardPlus: [],
    user: null,
    Product: [],
    clients: [],
    publications: [],
    idProduct: '',
    favoriteID: '',
    favoriteState : false,
    deleteImg : [],
    imageDelete: [],
    indexImg:'',
}

export const actionTypes = {
    ADD_TO_CARD: "ADD_TO_CARD",
    USER_FIREBASE: 'USER_FIREBASE',
    ADD_PRODUCT: 'ADD_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    CLIENT_DATA: 'CLIENT_DATA',
    DATA_PUBLICATION: 'DATA_PUBLICATION',
    ID_PRODUCTS: 'ID_PRODUCTS',
    FOVORITE_ID: 'FOVORITE_ID',
    FAVORITE_STATE : 'FAVORITE_STATE',
    DELETE_IMGA : 'DELETE_IMGA',
    IMAGES_DELETE : 'IMAGES_DELETE',
    IMG_INDEX : 'IMG_INDEX',

}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CARD":
            return {
                ...state,
                addCardPlus: [...state.addCardPlus, action.item]
            }
        case 'USER_FIREBASE':
            return {
                ...state,
                user: action.user
            }

        case 'ADD_PRODUCT':
            return {
                ...state,
                Product: [...state.Product, action.item]
            }
        case 'CLIENT_DATA':
            return {
                ...state,
                clients: [...state.clients, action.clients]
            }
        case 'ID_PRODUCTS':
            return {
                ...state,
                idProduct: action.idProduct
            }

        case 'DATA_PUBLICATION':
            return {
                ...state,
                publications: action.publications
            }
            case 'FOVORITE_ID': 
            return{
                ...state,
                favoriteID : action.favoriteID
            }
            case 'FAVORITE_STATE' : 
            return {
                ...state,
                favoriteState:action.favoriteState

            }
            case 'DELETE_IMGA' : 
            return {
                ...state,
                deleteImg:action.deleteImg

            }
            case 'IMAGES_DELETE' : 
            return {
                ...state,
                imageDelete:action.imageDelete

            }
            case 'IMG_INDEX' : 
            return {
                ...state,
                indexImg:action.indexImg

            }
            default: return state;
        }
}

export default reducer