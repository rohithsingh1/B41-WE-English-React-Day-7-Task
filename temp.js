const tempdata = [
    {
        fullName:"teacher1",
        classNo:[6,7]
    },
    {
        fullName:"teacher2",
        classNo:[7,8]
    },
    {
        fullName:"teacher3",
        classNo:[6,7,8]
    },
    {
        fullName:"teacher4",
        classNo:[8]
    }
]
const classno=6
//const result = tempdata[0].classNo.some((classnoarg)=>classnoarg===classno);
//console.log("result = ",result);
const filtereddata = tempdata.filter((data)=>{
    return data.classNo.some((classnoarg)=>classnoarg===classno);
})
console.log("filtereddata = ",filtereddata);