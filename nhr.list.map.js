/*
	Name        :    nhr.list.map.js
	Version     :    1.0
	Author      :    Nowshad Hossain Rahat
*/



/* THE LIST OBJECT */

function nhrList(arr){	
	let listArray=[];
	if(typeof(arr)==="object")
	{
	  for(let item of arr)
	  {
	    if(listArray.indexOf(item)<0){listArray.push(item);}
	  }
	}
	
	const listProperties={
	  add:(item)=>
	  {
	    if(listArray.indexOf(item)<0)
	    {
	      listArray.push(item);
	    }
	    return listProperties;
	  },
	  addTo:(index,item)=>
	  {
	    listArray.splice(index,1,item);
	    return listProperties;
	  },
	  get:(index)=>
	  {
	    if(typeof index=="number" && listArray.length>index>(-1)){return listArray[index];}
	  },
	  values:()=>{return listArray;},
	  clear:()=>
	  {
	    listArray=[];
	    return listProperties;
	  },
	  delete:(item)=>
	  {
	    let i=listArray.indexOf(item);
	    if(i>(-1)){listArray.splice(i,1);} 
	    return listProperties;
	  },
	  join:(array)=>
	  {
	    if(typeof(array)==="object")
	    {
	      for(let item of array){listArray.push(item)}
	    }
	    return listProperties;
	  },
	  has:(item)=>{
	    if(listArray.indexOf(item)>(-1))
	    {return true;}else{return false;}
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,index)=>{fun(item,index)});
	  },
	  indexOf:(item)=>listArray.indexOf(item),
	  size:()=>listArray.length
	}
	return listProperties;
}


/* THE MAP OBJECT */


function nhrMap(arr){	
	let listArray=[];
	if(arr!=undefined)
	{
	  for(let item of arr)
	  {
	    if(typeof(item)==="object")
	    {
	      listArray.push(item);
	    }
	  }
	}
	
	const listProperties={
	  set:(key,val)=>
	  {
	    let item=[key,val];
	    let index=listArray.indexOf(item);
	    if(index>0)
	    {
	      listArray[index]=item;
	    }
	    return listProperties;
	  },
	  get:(key)=>
	  {
	    let values=[];
	    listArray.forEach((it,i)=>{
	      if(it.indexOf(key)==0)
	      {
	        values.push(it[1]);
	      }
	    });
	    return values;
	  },
	  delete:(key)=>
	  {
	    for(let it of listArray)
	    {
	      if(it[0]===key)
	      {
	        listArray.splice(listArray.indexOf(it),1);
	      }
	    }
	    return listProperties;
	  },
	  keys:()=>
	  {
	    let keys=[];
	    listArray.forEach((it,i)=>{
	      keys.push(it[0]);
	    });
	    return keys;
	  },
	  values:()=>
	  {
	    let vals=[];
	    listArray.forEach((it,i)=>{
	      vals.push(it[1]);
	    });
	    return vals;
	  },
	  has:(item)=>
	  {
	    let bools=[];
	    for(let it of listArray)
	    {
	      if(it.indexOf(item)>(-1)){bools.push(true);}
	    }
	    if(bools.length<1)
	    {return false;}
	    else{return true;}
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,index)=>{fun(item,index);});
	    return listProperties;
	  },
	  clear:()=>{listArray=[];return listProperties;},
	  entries:()=>listArray,
	  size:()=>listArray.length
	}
	return listProperties;
}
