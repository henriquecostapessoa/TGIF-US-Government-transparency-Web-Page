var membersParty = data.results[0].members[0].party
var statistics = 0;
var sumMembersParty;

console.log(membersParty)

for (var i = 0; i < membersParty.length; i++) {
    if (membersParty === "R") {
        statistics += membersParty[i];
        //console.log(statistics)
    }    
    
   /* } else if (membersParty === "D") {
        sumMembersParty = membersParty + 1;
    } else {
        sumMembersParty = membersParty + 1;
    }*/
}



function sumEvenNumber (array) 
{
  var total = 0;
  for(var i = 0; i < array.length; i++) 
  {
    if (array[i] % 2 === 0) 
    {
       total += array[i];
    }
  }
  return total;
}