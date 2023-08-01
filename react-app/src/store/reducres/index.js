// import { combineReducers } from "redux";

import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import{userDetail} from"./user.reducers";
import {sendemail} from '../reducres/sendmail.reducer'
const rootReducer = combineReducers({
    authentication,
    userDetail,
    sendemail,
})
export default rootReducer;