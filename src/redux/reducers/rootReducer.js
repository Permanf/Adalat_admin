import { combineReducers } from 'redux'
import { newsReducer } from './newsReducer'
import { userReducer } from './userReducer'
import { serviceReducer } from './serviceReducer'
import { departmentReducer } from './departmentReducer'
import { siteReducer } from './siteReducer'
import { mainReducer } from './mainReducer'
import { statisticReducer } from './statisticReducer'
import { lawsReducer } from './lawsReducer'
import { provinceReducer } from './provinceReducer'
import { yearReducer } from './yearReducer'
import { postReducer } from './postReducer'
import { bannerReducer } from './bannerReducer'
import { lawyerReducer } from './lawyerReducer'
import { clientReducer } from './clientReducer'
import { subscribeReducer } from './subscribeReducer'
import { questionReducer } from './questionReducer'
import { passwordReducer } from './passwordReducer'
import { archiveReducer } from './archiveReducer'
import { contactReducer } from './contactReducer'
import { adalatAppReducer } from './adalatAppReducer'
import { paymentReducer } from './paymentReducer'
import { smsReducer } from './smsReducer'
import { questionAnswerReducer } from './questionAnswerReducer'
import { legislationReducer } from './legislationReducer'
import { receptionReducer } from './receptionReducer'
import { legislationFileReducer } from './legislationFileReducer'

export const rootReducer = combineReducers({
    main: mainReducer,
    news: newsReducer,
    post: postReducer,
    user: userReducer,
    client: clientReducer,
    subscribe: subscribeReducer,
    laws: lawsReducer,
    lawyer: lawyerReducer,
    service: serviceReducer,
    province: provinceReducer,
    department: departmentReducer,
    site: siteReducer,
    statistics: statisticReducer,
    year: yearReducer,
    banner: bannerReducer,
    question: questionReducer,
    password: passwordReducer,
    archive: archiveReducer,
    contact: contactReducer,
    adalatApp: adalatAppReducer,
    payment: paymentReducer,
    sms: smsReducer,
    questionAnswer: questionAnswerReducer,
    legislations:legislationReducer,
    receptions:receptionReducer,
    legislationFiles:legislationFileReducer,
})
