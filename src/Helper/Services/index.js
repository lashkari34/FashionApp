import axios from 'axios';
import { BaseURL } from "../BaseURL/index";
import { UserServicesList, FeedServicesList, otherApis, likeModuleApis, followModuleApis, chatModuleApis } from "../Services/ServiceList";
import AsyncStorage from '@react-native-async-storage/async-storage';
//  let SignupAuthToken = ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhhNGZhNmY0ODMyZDA2M2VjMTE1ZmIiLCJlbWFpbCI6InRlc3RkZW1vQGdtYWlsLmNvbSIsImlhdCI6MTYxOTY3NzE5NX0.YQ3n8Z-9IqedOHdlHSWAxJ8qMH0uC-W7DuDaxm8_2yE';


//  let SignupAuthToken =  AsyncStorage.getItem('token');  


const CreateUser = async (username, firstName, lastName, email, password) => {

    let fData = {
        data: {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.CreateAccount,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            console.log(error);
            // return Promise.reject(error);
        });
}



const LoginUser = async (email, password, fcmToken) => {
    let fData = {
        data: {
            email: email,
            password: password,
            deviceId: fcmToken
        }
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.Login,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });
}
//ForgotPassword
const ForgotPassword = async (email) => {
    let fData = {
        data: {
            email: email
        }
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.forgotPassword,
        headers: {
            'Content-Type': 'application/json',

        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}
//AccountVerificationApi
const AccountVerificationApi = async (token) => {

    let data = {
        token: token
    }

    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.accountVerification,
        headers: {
            'Content-Type': 'application/json',

        },
        data: data
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}

//GenderUpdate
const UpdateGender = async (_id, gender, token) => {
    let fData = {

        _id: _id,
        gender: gender

    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.updateUser,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });


}

//EmailUpdate
const UpdateEmail = async (_id, email, token) => {
    let fData = {
        _id: _id,
        email: email
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.updateUser,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}


//UpdateBirthDate

const UpdateBirthDate = async (_id, dob, token) => {
    let fData = {

        _id: _id,
        dob: dob

    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.updateUser,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });


}


//FirstLastNameUpdate
const UpdateFirstLastName = async (_id, firstName, lastName, token) => {
    let fData = {

        _id: _id,
        firstName: firstName,
        lastName: lastName

    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.updateUser,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}

//ProfileTypeUpdate
const UpdateProfileType = async (_id, profileType, token) => {
    let fData = {

        _id: _id,
        profileType: profileType

    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.updateUser,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}


const UpdatePhoneNumber = async (_id, countryCode, phoneNumber, token) => {
    let fData = {

        _id: _id,
        countryCode: countryCode,
        phoneNumber: phoneNumber

    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.updateUser,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}



const ResetPassword = async (_id, oldPassword, newPassword, token) => {
    let fData = {
        data: {
            _id: _id,
            oldPassword: oldPassword,
            newPassword: newPassword
        }
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.updatePassword,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: (fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}

//UploadProfilePictures
const UploadProfilePictures = async (_id, file) => {
    let data = new FormData();
    data.append('_id', _id);
    data.append('file', {
        uri: file.path,
        type: file.mime,
        name: `filename${Math.random().toString(36).substring(7)}.jpg`
    })
    console.log(data);
    return fetch(BaseURL + UserServicesList.uploadImage, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: data
    })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            return response
        })
        .catch(function (error) {
            // console.log(error+ "Failed")
            return error
        });
}


// //UploadFeedPictures
//UploadFeedPictures
export const UploadFeedCamera = async(image) => {
    console.log('Axiosdata',image);
    let data = new FormData();
  
     data.append('file', {
            uri: image.path,
            type: image.mime ,
            name: image.mime !== "image/jpeg" ?  `filename${Math.random().toString(36).substring(7)}.mp4`:   `filename${Math.random().toString(36).substring(7)}.jpg`
    })
    

    let config = {
        method: 'POST',
        url: BaseURL + UserServicesList.FeeduploadFile,
        data: data,
    };
  console.log(data)
  return axios(config)
        .then(response => {
            return response
        })
        .catch(error => {   
        });
}



// export const UploadFeedCamera = async (image) => {
//     console.log('Axiosdata', image);
//     let data = new FormData();

//     data.append('file', {
//         uri: image.path,
//         type: image.mime,
//         name: image.mime !== "image/jpeg" ? `filename${Math.random().toString(36).substring(7)}.mp4` : `filename${Math.random().toString(36).substring(7)}.jpg`
//     })

//     let config = {
//         method: 'POST',
//         url: BaseURL + UserServicesList.FeeduploadFile,
//         data: data,
//     };
    
//     console.log(data)
//     return axios(config)
//         .then(response => {
//             return response
//         })
//         .catch(error => {
//         });
// }
//UploadFeedPictures
const UploadFeedPictures = async (image) => {
    console.log('Axiosdata', image);
    let data = new FormData();
    for (var i = 0; i < image.length; i++) {
        data.append('file', {
            uri: image[i].path,
            type: image[i].mime,
            name: image[i].mime !== "image/jpeg" ? `filename${Math.random().toString(36).substring(7)}.mp4` : `filename${Math.random().toString(36).substring(7)}.jpg`
        })
    }

    let config = {
        method: 'POST',
        url: BaseURL + UserServicesList.FeeduploadFile,
        data: data,
    };
    console.log(data)
    return axios(config)
        .then(response => {
            return response
        })
        .catch(error => {
        });
}

//Add_Feed
const AddFeed = async (user_id, caption, category, brand, color, size, imageURL, token) => {
    let fData = {
        data: {
            user_id: user_id,
            captionOption:
                [{
                    caption: caption,
                    category: category,
                    brand: brand,
                    color: color,
                    size: size,
                    imageURL: imageURL
                },
                ],
        }
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'post',
        url: BaseURL + FeedServicesList.addFeed,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            return response
        })
        .catch(error => {
        });

}
//FeedListByCategoryTrending
const FeedListByCategoryTrending = async (_id, title, page, token) => {
    let data = {
        _id: _id,
        page: page,

    }
    if (title !== '') {
        data['category'] = title;
    }
    console.log(JSON.stringify(data))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.findFeedListByCategory,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(data)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}

//FeedListByCategorySearch
export const FeedListByCategorySearch = async (_id, search, token) => {
    let data = {
        _id: _id,
        search: search,
    }

    console.log(JSON.stringify(data))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.findFeedListByCategory,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(data)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}

//FeedListByCategory
const FeedListByCategory = async (user_id, title, filter, token) => {
    let data = {
        user_id: user_id,
        filter: filter

    }
    if (title !== '') {
        data['category'] = title;
    }
    console.log(JSON.stringify(data))
    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.findFeedListByCategory,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        data: JSON.stringify(data)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response
            // }

        })
        .catch(error => {
            // console.log(error);
            // return Promise.reject(error);
        });

}

//AllCategorylist
const AllCategoryListing = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL + UserServicesList.getAllCategory,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },

    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}






//FeedWithFollowerFeed
const FeedWithFollowerFeed = async (_id) => {
    let data = {
        _id: _id,

    }
    // if(_id !== ''){
    //     data['_id'] = _id;
    // }

    let config = {
        method: 'post',
        url: BaseURL + UserServicesList.getFeedWithFollowerFeed,
        headers: {
            'Content-Type': 'application/json',

        },
        data: (data)
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}



export const getLatestChatService = async (userId, token) => {
    let fData = {
        "_id": userId
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + chatModuleApis.getLatestChatApi,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response?.data
            // }

        })
        .catch(error => {
            console.log(error);
            // return Promise.reject(error);
        });
}


export const blockUnblockService = async (userId, token) => {
    let fData = {
        "userToBeBlocked": userId
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + chatModuleApis.blockUnblockUserMsgApi,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response?.data
            // }

        })
        .catch(error => {
            console.log(error);
            // return Promise.reject(error);
        });
}


export const findAllLikesService = async (userName) => {
    let fData = {
        "username": userName
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + likeModuleApis.findAllLikesApi,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response?.data
            // }

        })
        .catch(error => {
            console.log(error);
            // return Promise.reject(error);
        });
}


export const followingList = async (userId) => {
    let fData = {
        "userId": userId
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + followModuleApis.fetchFollowingListApi,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response?.data
            // }

        })
        .catch(error => {
            console.log(error);
            // return Promise.reject(error);
        });
}


export const acceptRejectService = async (id, bool) => {
    let fData = {
        "notificationId": id,
        "isAccepted": bool
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + followModuleApis.acceptRejectApi,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response?.data
            // }

        })
        .catch(error => {
            console.log(error);
            // return Promise.reject(error);
        });
}


export const followRequestListService = async (userId, token) => {
    let fData = {
        "receiverId": userId,
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + followModuleApis.followRequestListApi,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response?.data
            // }

        })
        .catch(error => {
            console.log(error);
            return error
        });
}


export const followerListService = async (userId) => {
    let fData = {
        "userId": userId
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + followModuleApis.fetchFollowersListApi,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {

            return response
            // }

        })
        .catch(error => {
            console.log(error);
            // return Promise.reject(error);
        });
}


export const addFollowService = async (userId, followerId) => {

    let fData = {
        userId: userId,
        followerId: followerId
    }
    console.log(fData)
    let config = {
        method: 'POST',
        url: BaseURL + followModuleApis.addFollow,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };
    console.log(userId)
    return axios(config)
        .then(response => { return response?.data })
        .catch(error => console.log(error));
}


export const unFollowService = async (userId, followerId) => {
    console.log('sdfdsd')
    let fData = {
        // data: {
        userId: userId,
        followerId: followerId
        // }
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + followModuleApis.unFollow,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        // .then(res => console.log(JSON.stringify(res?.data,"lklklk")))
        .then(response => { return response?.data })
        .catch(error => console.log(error));
}


export const addLikeService = async (feedId, likes) => {
    console.log('sdfdsd')
    let fData = {
        feedId,
        likes
     }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + likeModuleApis.addLikeAPi,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        // .then(response => {console.log(response?.data,"000")})
        .then(response => {return response?.data})
        .catch(error => console.log(error));
}



export const removeLikeService = async (feedId, likes) => {
    console.log('sdfdsd')
    let fData = {
        feedId,
        likes
     }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + likeModuleApis.removeLikeAPi,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {return response?.data})
        .catch(error => console.log(error));
}


export const searchUserService = async (text) => {

    let fData = {
        "search": text
        // "userId": id
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + otherApis.searchUser,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        // .then(response => {console.log(JSON.stringify(response?.data))})
        .then(response => { return response?.data })
        .catch(error => console.log(error));
}

export const getUserViaIdNameService = async (text, id) => {

    let fData = {
        "search": text,
        "userId": id
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + otherApis.searchUser,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        // .then(response => {console.log(JSON.stringify(response?.data))})
        .then(response => { return response?.data })
        .catch(error => console.log(error));
}


export const searchUserByIdService = async (id, userId) => {
    console.log('searchUserService')
    let fData = {
        "id": id,
        "userId": userId
    }
    console.log(JSON.stringify(fData, "abcd"))
    let config = {
        method: 'POST',
        url: BaseURL + otherApis.searchUserById,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        // .then(response => {alert(JSON.stringify(response?.data?.data,"ffsdakhfkajfhsdhdhfksdhk"))})
        .then(response => { return response?.data })
        .catch(error => console.log(error));
}


export const findUserByIdService = async (id) => {
    console.log('findUserByIdService')
    let fData = {
        "_id": id
    }

    let config = {
        method: 'POST',
        url: BaseURL + otherApis.findUserById,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        // .then(response => {alert(JSON.stringify(response?.data?.data,"ffsdakhfkajfhsdhdhfksdhk"))})
        .then(response => { return response?.data })
        .catch(error => console.log(error));
}


export const chatHistoryOfUser = async (user1, user2, token, page) => {
    let fData = {
        "from": user1,
        "to": user2,
        "limit": 50,
        "page": page
    }
    console.log(JSON.stringify(fData))
    let config = {
        method: 'POST',
        url: BaseURL + chatModuleApis.getChatHistoryForUsersApi,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: JSON.stringify(fData)
    };

    return axios(config)
        .then(response => {
            // if (response.status == 200) {
            return response?.data
            // }

        })
        .catch(error => {
            console.log(error);
            // return Promise.reject(error);
        });
}



export { CreateUser, LoginUser, AccountVerificationApi, ForgotPassword, UpdateFirstLastName, UpdateGender, UpdateEmail, UpdatePhoneNumber, UpdateBirthDate, ResetPassword, UpdateProfileType, AddFeed, UploadProfilePictures, UploadFeedPictures, FeedListByCategory, AllCategoryListing, FeedWithFollowerFeed, FeedListByCategoryTrending };