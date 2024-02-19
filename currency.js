const BASE_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowms=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const updateExhangeRate=async()=>{
  let amount=document.querySelector("form input");
  let amtVal=amount.value;
  if(amtVal==="" || amtVal<1)
  {
    amtVal=1;
    amount.value="1";
  }
  //console.log(fromCurr.value, toCurr.value);
  const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
  console.log(URL);
  let response=await fetch(URL);
  let data=await response.json();
  let rate=data[toCurr.value.toLowerCase()];
  console.log(rate);
  const msg=document.querySelector(".msg");
  let finalAmt=rate * amtVal;
  finalAmt = parseFloat(finalAmt.toFixed(3));
  console.log(finalAmt);
  msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
  
}



// for(let code in countryList)
// {
//   console.log(code, countryList[code]);
// }

for(let select of dropdowms)
{
    for(let currCode in countryList)
    {
      let newOption=document.createElement("option");
    
      newOption.innerText=currCode;
      newOption.value=currCode;
   
      if(select.name==="from" && currCode==="USD"){
         newOption.selected="selected";

      }
      else if(select.name==="to" && currCode==="INR"){
        newOption.selected="selected";

     }
      select.append(newOption);
      
    }
    // console.log(select.name);
}

dropdowms.forEach(dropdowm => {
    dropdowm.addEventListener("change", () => {

        // Your event listener logic here
        // console.log(dropdowm.name);
        console.log(countryList[dropdowm.value]);
        if(dropdowm.name==="from")
        {
        const i=countryList[dropdowm.value]
        const imto=`https://flagsapi.com/${i}/shiny/64.png`;
        const imgto=document.querySelector("#from");
        imgto.src=imto;
        }
        if(dropdowm.name==="to")
        {
        const i=countryList[dropdowm.value]
        const imto=`https://flagsapi.com/${i}/shiny/64.png`;
        const imgto=document.querySelector("#to");
        imgto.src=imto;
        }
      
    });
});

btn.addEventListener("click",(evt)=>
{
  evt.preventDefault();
  updateExhangeRate();
  
});

window.addEventListener("load",()=>
{
  updateExhangeRate();
});

