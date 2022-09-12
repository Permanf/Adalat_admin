import { all } from 'redux-saga/effects'
import {
    addDepartmentImageWatcher,
    getDepartmentWatcher,
    loadDepartmentsWatcher,
    postDepartmentWatcher,
    removeDepartmentWatcher,
    updateDepartmentWatcher
} from './departmentSaga'

import {
    getLawWatcher,
    loadLawsWatcher,
    postLawCategoryWatcher,
    putLawCategoryWatcher,
    deleteLawCategoryWatcher,
    postLawWatcher,
    getLawFileWatcher,
    loadLawConfirmDepartmentsWatcher,
    putLawWatcher,
    deleteLawFileWatcher,
    addImageLawFileWatcher,
    getLastUpdatedWatcher,
    saveLastUpdatedWatcher,
    getFilesWatcher,
} from './lawsSaga'


import {
    getNewsItemWatcher,
    loadNewsWatcher,
    postNewsWatcher,
    putNewsWatcher,
    removeNewsWatcher
} from './newsSaga'

import {
    getPostWatcher,
    loadEventsWatcher,
    loadPostsWatcher,
    postPostWatcher,
    removePostWatcher,
    updatePostWatcher
} from './postSaga'

import {
    deleteSiteWatcher,
    postSiteWatcher,
    sitesWatcher
} from './siteSaga'

import {
    putStatisticsWatcher,
    statisticsWatcher
} from './statisticSaga'

import {
    loadYearsWatcher
} from './yearSaga'

import {
    loadProvinceWatcher, saveProvinceWatcher
} from './provinceSaga'

import {
    loadServiceWatcher,
    postServiceWatcher,
    removeServiceWatcher
} from './serviceSaga'

import {
    deleteBannerWatcher,
    loadBannersWatcher,
    postBannerWatcher
} from './bannerSaga'

import {
    deleteLawyerWatcher,
    getLawyerCommentsWatcher,
    getLawyerWatcher,
    loadLawyerWatcher,
    postLawyerWatcher,
    putLawyerWatcher
} from './lawyerSaga'

import {
    getClientsWatcher, removeClientWatcher
} from './clientSaga'

import {
    getSubscribersWatcher
} from './subscribeSaga'

import {
    getQuestionsWatcher, getQuestionWatcher
} from './questionSaga'

import {
    getPasswordsWatcher,
    postPasswordWatcher
} from './passwordSaga'
import { getArchivesWatcher } from './archiveSaga'
import { getContactsWatcher, getContactWatcher } from './contactSaga'
import { getAppListWatcher, getAppOrdersWatcher, getAppOrderWatcher, getChangeStatusAppOrderWatcher } from './adalatAppSaga'
import { getChangeStatusPaymentWatcher, getPaymentsWatcher, getPaymentWatcher } from './paymentSaga'
import { getSmsCountsWatcher, getSmsListWatcher, getSmsTemplatesWatcher } from './smsSaga'
import {    
    deleteQuestionCategoryWatcher, 
    getCategoryQuestionAnswersWatcher, 
    getQuestionAnswerWatcher,
    getQuestionCategoriesWatcher, 
    getQuestionCategoryWatcher, 
    getQuestionSubCategoriesWatcher, 
    storeCategoryQuestionAnswerWatcher, 
    storeQuestionCategoryWatcher, 
    storeQuestionSubCategoryWatcher, 
    updateQuestionCategoryWatcher,
    putQuestionAnswerWatcher,
    deleteQuestionAnswerWatcher
 } from './questionAnswerSaga'
import{
    getLegislationWatcher,
    putLegislationWatcher,
    deleteLegislationWatcher,
    storeLegislationWatcher,
    getLegislationsWatcher,
 
} from './legislationSaga'
import{
    getLegislationFileWatcher,
    putLegislationFileWatcher,
    deleteLegislationFileWatcher,
    storeLegislationFileWatcher,
    getLegislationFilesWatcher,
 
} from './legislationFileSaga'
import{
    getReceptionWatcher,
    putReceptionWatcher,
    deleteReceptionWatcher,
    storeReceptionWatcher,
    getReceptionsWatcher,
 
} from './receptionSaga'

/**
 * RootSaga. All sagas
 */

export default function* rootSaga()
{
    yield all([
        // News watchers
        loadNewsWatcher(),
        getNewsItemWatcher(),
        postNewsWatcher(),
        putNewsWatcher(),
        removeNewsWatcher(),

        // Post watchers
        loadPostsWatcher(),
        loadEventsWatcher(),
        getPostWatcher(),
        postPostWatcher(),
        updatePostWatcher(),
        removePostWatcher(),

        // Law watchers
        getFilesWatcher(),
        getLawWatcher(),
        getLawFileWatcher(),
        loadLawsWatcher(),
        loadLawConfirmDepartmentsWatcher(),
        postLawCategoryWatcher(),
        putLawCategoryWatcher(),
        deleteLawCategoryWatcher(),
        postLawWatcher(),
        putLawWatcher(),
        addImageLawFileWatcher(),
        deleteLawFileWatcher(),
        getLastUpdatedWatcher(),
        saveLastUpdatedWatcher(),

        

        // Service watchers
        loadServiceWatcher(),
        postServiceWatcher(),
        removeServiceWatcher(),

        // Department watchers
        loadDepartmentsWatcher(),
        getDepartmentWatcher(),
        postDepartmentWatcher(),
        addDepartmentImageWatcher(),
        updateDepartmentWatcher(),
        removeDepartmentWatcher(),

        // Site watchers
        sitesWatcher(),
        postSiteWatcher(),
        deleteSiteWatcher(),

        // Statistic watchers
        statisticsWatcher(),
        putStatisticsWatcher(),

        // Province watchers
        loadProvinceWatcher(),
        saveProvinceWatcher(),

        // Year watchers
        loadYearsWatcher(),

        // Banner watchers
        deleteBannerWatcher(),
        postBannerWatcher(),
        loadBannersWatcher(),

        // Lawyer watchers
        loadLawyerWatcher(),
        getLawyerWatcher(),
        postLawyerWatcher(),
        putLawyerWatcher(),
        deleteLawyerWatcher(),
        getLawyerCommentsWatcher(),

        // Client watchers
        getClientsWatcher(),
        removeClientWatcher(),

        // Subscribe watchers
        getSubscribersWatcher(),

        // Question watchers
        getQuestionsWatcher(),
        getQuestionWatcher(),

        // Setting password watchers
        getPasswordsWatcher(),
        postPasswordWatcher(),

        // Setting archive watchers
        getArchivesWatcher(),

        // Contact watchers
        getContactsWatcher(),
        getContactWatcher(),

        // Adalat App watchers
        getAppOrdersWatcher(),
        getAppOrderWatcher(),
        getChangeStatusAppOrderWatcher(),
        getAppListWatcher(),

        // Payment watchers
        getPaymentsWatcher(),
        getPaymentWatcher(),
        getChangeStatusPaymentWatcher(),

        // SMS watchers
        getSmsListWatcher(),
        getSmsTemplatesWatcher(),
        getSmsCountsWatcher(),

        // Question answer watchers
        getQuestionCategoriesWatcher(),
        getQuestionCategoryWatcher(),
        storeQuestionCategoryWatcher(),
        getQuestionSubCategoriesWatcher(),
        getCategoryQuestionAnswersWatcher(),
        storeCategoryQuestionAnswerWatcher(),
        storeQuestionSubCategoryWatcher(),
        updateQuestionCategoryWatcher(),
        deleteQuestionCategoryWatcher(),
        getQuestionAnswerWatcher(),
        putQuestionAnswerWatcher(),
        deleteQuestionAnswerWatcher(),



        //////Legislation
        getLegislationWatcher(),
        putLegislationWatcher(),
        deleteLegislationWatcher(),
        storeLegislationWatcher(),
        getLegislationsWatcher(),

        //////LegislationFiles
        getLegislationFileWatcher(),
        putLegislationFileWatcher(),
        deleteLegislationFileWatcher(),
        storeLegislationFileWatcher(),
        getLegislationFilesWatcher(),


         //////Reception
         getReceptionWatcher(),
         putReceptionWatcher(),
         deleteReceptionWatcher(),
         storeReceptionWatcher(),
         getReceptionsWatcher(),
        
        
    ])
}