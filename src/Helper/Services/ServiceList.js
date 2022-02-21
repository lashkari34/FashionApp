const UserServicesList = {
    CreateAccount: "user/createAccount",
    accountVerification: "user/accountVerification",
    Login: "user/Login",
    updateUser: "user/updateUser",
    updatePassword:"user/updatePassword",
    forgotPassword: "user/forgotPassword",
    replacePassword: "user/replacePassword",
    uploadImage: "user/uploadImage",
    FeeduploadFile:"feed/uploadFile",
    findFeedListByCategory:"feed/findFeedListByCategory",
    getAllCategory:"category/getAllCategory",
    getFeedWithFollowerFeed:"feed/getFeedWithFollowerFeed",
    followAcceptReject:"follow/followAcceptReject"
}

const FeedServicesList = {

    addFeed: "feed/addFeed",
    getFeedList: "feed/getFeedList"

}


export const followModuleApis = {
    fetchFollowingListApi: "follow/getFollowDetails",
    fetchFollowersListApi: "follow/getFollowerDetails",
    addFollow: "follow/followUser",
    unFollow: "follow/unfollowUser",
    followRequestListApi: "notification/getNotificationListByUserId",
    acceptRejectApi: "follow/followAcceptReject",
}

export const likeModuleApis = {
    addLikeAPi: 'like/addLike',
    removeLikeAPi: 'like/updateLike',
    findAllLikesApi: 'like/findAllLikes_1'
}

export const otherApis = {
    searchUser: 'user/findUserByAggregate',
    searchUserById: 'user/findUserIdwithfollowerId',
    findUserById: 'user/findUserById'

}

export const chatModuleApis = {
    getChatHistoryForUsersApi: 'chat/getChatHistoryForUsers',
    blockUnblockUserMsgApi: 'chat/blockedUserMsg',
    getLatestChatApi: 'chat/getlatestChat',
}

export { UserServicesList, FeedServicesList };