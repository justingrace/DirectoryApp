const Member = require("./models/member")

module.exports = {
    allMembers: () => {
        return Member.find({})
            .then((data)=>{
                return data;
            })
            .catch((err)=>{
                console.log(err);
            })
    },
    editMember: (id, newDetails) => {
        return Member.findByIdAndUpdate(id, {$set: newDetails})
            .then((data)=>{
                return data;
            })
            .catch((err)=>{
                console.log(err);
            })

    },

    findMember: (id) => {
        return Member.findById(id)
            .then((data)=>{
                return data;
            })
            .catch((err)=>{
                console.log(err);
            })
    },

    deleteMember: (id) => {
        return Member.findByIdAndRemove(id)
            .then((data)=>{
                return data;
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}
