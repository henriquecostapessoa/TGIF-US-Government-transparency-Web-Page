function proPublica () {
    
    var url = "https://api.propublica.org/congress/v1/113/house/members.json";
    fetch(url, {
        method: "GET",
        headers: {
            "X-API-Key": "AMo4GwFt6B2Ggi9Bga9mLnQ0BVVBobtNKCLfvYeJ"
        }  
    })
    .then(response=>response.json())
    .then(response=>{
        var members = response.results[0].members
        main(members)
        console.log(members)
    })
    .catch(err=>console.log(err))

}
proPublica()

function main(mainArray) {

    builtTable(mainArray)
    builtSelect(mainArray) 
    filter(mainArray)
    
}

function builtTable (array) 
{
    var tbody = document.getElementById("table-body2")
    
    for (var i = 0; i < array.length; i++) 
    {
        var trow = document.createElement("tr")
        var fullName;
        if (array[i].middle_name !== null) {
        fullName = array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name}
        else {fullName = array[i].first_name + " " + array[i].last_name}

        trow.insertCell().innerHTML = fullName.link(array[i].url)
        trow.insertCell().innerHTML = array[i].party
        trow.insertCell().innerHTML = array[i].state
        trow.insertCell().innerHTML = array[i].seniority
        trow.insertCell().innerHTML = array[i].votes_with_party_pct
        tbody.appendChild(trow)
        //console.log(tbody)
    }   
}



function filter (array) {
    
    var x = document.querySelectorAll("input[name=party]")
   
    Array.from(document.querySelectorAll("input[name=party]")).forEach(Element=>{
        Element.addEventListener("click", ()=> checkTable(array))
    }) 

    var selectBody = document.getElementById("states").addEventListener("change", ()=> checkTable(array))
  
} 


function checkTable(array) {
    
    var table = document.getElementById("table-body2")
    var selectBody = document.getElementById("states").value
    table.innerHTML=""
    var checkbox = Array.from(document.querySelectorAll("input[name=party]:checked")).map(function(option) {
        return option.value;
      });
    
    if (checkbox.length === 0 && selectBody === "All") {
        builtTable (array)
    }  
    else if (checkbox.length > 0 && selectBody === "All") {
        builtTable (array.filter(senator=>checkbox.includes(senator.party)))
    }
    else if (checkbox.length > 0 && selectBody !== "All") {
        builtTable (array.filter(senator=>selectBody === senator.state && checkbox.includes(senator.party)))
    }
    else if (checkbox.length === 0 && selectBody !== "All") {
        builtTable (array.filter(senator=>selectBody === senator.state))
    }
}

function builtSelect (array) {

    var selectBody = document.getElementById("states")
    var emptyarray = [];
    for (var i = 0; i < array.length; i++) {
        emptyarray.push (array[i].state)
    }
    var x = emptyarray.filter((a, b) => emptyarray.indexOf(a) === b).sort()
    x.forEach(element=>{
        var trow = document.createElement("option")
        trow.innerHTML = element
        selectBody.appendChild(trow)
    })
}
