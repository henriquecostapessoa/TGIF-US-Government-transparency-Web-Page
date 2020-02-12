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
        
    })
    .catch(err=>console.log(err))

}
proPublica()

function main(mainArray) {
    
    sumParty(mainArray, "R");
    sumParty(mainArray, "D");
    sumParty(mainArray, "I");
    builtObject(mainArray)
    houseGlance (mainArray)
    votesWithParty(mainArray, "R");
    votesWithParty(mainArray, "D");
    votesWithParty(mainArray, "I");
    topName(mainArray)
    leastEngaged (mainArray)
    bottomName(mainArray)
    mostEngaged (mainArray)
    totalAverage (mainArray)
    
}

function totalAverage (array) {

var average = ((votesWithParty(array, "R") + votesWithParty(array, "D") + votesWithParty(array, "I")) / 3).toFixed(2)
return average
}

var statistics = {
    "Number_of_Democrats":"", 
    "Number_of_Republicans":"", 
    "Number_of_Independents":"", 
    "Total_of_Senators":"", 
    "votes_of_Republicans":"", 
    "votes_of_Independents":"", 
    "votes_of_Democrates":"", 
    "Total_votes_of_Senators":"",
    "Least_Engaged":"",
    "Most_Engaged":"",
    "Most_Loyal":"",
    "Least_Loyal":""
}
console.log(statistics)

function sumParty(array, partycode) {

    var counter = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].party === partycode) {
            counter ++
        }  
    }
return counter 
}


function builtObject (array) {
    

    statistics.Number_of_Republicans = sumParty(array, "R");
    statistics.Number_of_Independents = sumParty(array, "I");
    statistics.Number_of_Democrats = sumParty(array, "D");
    statistics.Total_of_Senators = array.length;
    statistics.Total_votes_of_Senators = totalAverage(array);
    statistics.Least_Engaged = bottomName(array);
    statistics.Most_Engaged = topName(array);
    statistics.votes_of_Republicans = votesWithParty(array, "R").toFixed(2);
    statistics.votes_of_Democrats = votesWithParty(array, "D").toFixed(2);
    statistics.votes_of_Independents = votesWithParty(array, "I").toFixed(2);
    statistics.Total_votes_of_Senators = totalAverage(array);
    
}


function houseGlance () {
    
    var trow = document.getElementById("table-row")
    var trow2 = document.getElementById("table-row2")
    var trow3 = document.getElementById("table-row3")
    var trow4 = document.getElementById("table-row4")


  
      trow.insertCell().innerHTML = statistics.Number_of_Republicans
      trow.insertCell().innerHTML = statistics.votes_of_Republicans
      trow2.insertCell().innerHTML = statistics.Number_of_Democrats
      trow2.insertCell().innerHTML = statistics.votes_of_Democrats 
      trow3.insertCell().innerHTML = statistics.Number_of_Independents
      trow3.insertCell().innerHTML = statistics.votes_of_Independents
      trow4.insertCell().innerHTML = statistics.Total_of_Senators
      trow4.insertCell().innerHTML = statistics.Total_votes_of_Senators
}
//console.log(statistics)

function votesWithParty (array, partycode) {

    var average;
    var counter = 0;
    var emptyarray = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i].party === partycode) {
            emptyarray.push (array[i].votes_with_party_pct)
            counter ++
            average = emptyarray.reduce((a, b) => a + b, 0) / counter ++

        } else if (average === undefined) {
            average = 0
        }     
    } 
    return average
}


function topName (array) {

    
    var finalarray = [];
    var emptyarray = [];
    for (var i = 0; i < array.length; i++) {
        emptyarray.push (array[i].missed_votes_pct)
        emptyarray.sort(function(a, b){return a-b})  
    }
    var percentage = Math.round(emptyarray.length*0.1);
    emptyarray = emptyarray.slice(0, percentage)
    console.log(emptyarray)
    var maxemptyarray = Math.max(...emptyarray)
    console.log(maxemptyarray)
    for (var j = 0; j < array.length; j++) {
        if (array[j].missed_votes_pct <= maxemptyarray) {
            finalarray.push (array[j])
        }
    }
    //var final = array.filter (member => member.missed_votes_pct <= 0.3)
    return finalarray
}


function leastEngaged () {
    
    var tbody = document.getElementById("table-body-leastEngaged")

    for (var i = 0; i < statistics.Least_Engaged.length; i++) {

        var trow = document.createElement("tr")
        var fullName;
        if (statistics.Least_Engaged[i].middle_name !== null) {
            fullName = statistics.Least_Engaged[i].first_name + " " + statistics.Least_Engaged[i].middle_name + " " + statistics.Least_Engaged[i].last_name
        }
        else {
            fullName = statistics.Least_Engaged[i].first_name + " " + statistics.Least_Engaged[i].last_name
        }
        trow.insertCell().innerHTML = fullName.link(statistics.Least_Engaged[i].url)
        trow.insertCell().innerHTML = statistics.Least_Engaged[i].missed_votes
        trow.insertCell().innerHTML = statistics.Least_Engaged[i].missed_votes_pct
        tbody.appendChild(trow)
    }
    
}

function bottomName (array) {

    var finalarray = [];
    var emptyarray = [];
    for (var i = 0; i < array.length; i++) {
        emptyarray.push (array[i].missed_votes_pct)
        emptyarray.sort(function(a, b){return b-a})  
    }
    var percentage = Math.round(emptyarray.length*0.1);
    emptyarray = emptyarray.slice(0, percentage)
    //console.log(emptyarray)
    var minemptyarray = Math.min(...emptyarray)
    //console.log(minemptyarray)
    for (var j = 0; j < array.length; j++) {
        if (array[j].missed_votes_pct >= minemptyarray) {
            finalarray.push (array[j])
        }
    }
    //var final = array.filter (member => member.missed_votes_pct <= 0.3)
    return finalarray
}


function mostEngaged () {
    
    var tbody = document.getElementById("table-body-mostEngaged")

    for (var i = 0; i < statistics.Most_Engaged.length; i++) {

        var trow = document.createElement("tr")
        var fullName;
        if (statistics.Most_Engaged[i].middle_name !== null) {
        fullName = statistics.Most_Engaged[i].first_name + " " + statistics.Most_Engaged[i].middle_name + " " + statistics.Most_Engaged[i].last_name}
        else {fullName = statistics.Most_Engaged[i].first_name + " " + statistics.Most_Engaged[i].last_name}

        trow.insertCell().innerHTML = fullName.link(statistics.Most_Engaged[i].url)
        trow.insertCell().innerHTML = statistics.Most_Engaged[i].missed_votes
        trow.insertCell().innerHTML = statistics.Most_Engaged[i].missed_votes_pct
        tbody.appendChild(trow)
    }
    
}
