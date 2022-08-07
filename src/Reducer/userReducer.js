function userReducer(state,action){
    switch(action.type){
        case 'add':
            return [...state,action.user];
        case 'edit':
            return state.map(user=>{
                if(user.id===action.id){
                    return action.editedUser
                }else{
                    return user
                }
            })
        case 'remove':
            return state.filter(user=>user.id!==action.id)
        default :
            return state
    }
}

export default userReducer
//add-action.user
//edit-action.id  action.editedUser
//remove-action.id *note:also remove places associated with this user