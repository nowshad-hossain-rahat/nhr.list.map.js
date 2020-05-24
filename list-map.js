/*

Name : list-map.js
Version : 1.0
Type : JavaScript Custom API
Author : Nowshad Hossain Rahat

*/


/* THE LIST OBJECT */

function List(arr){	
	let listArray=[];
	if(arr)
	{
	  for(let item of arr)
	  {
	    if(listArray.indexOf(item)<0){listArray.push(item);}
	  }
	}
	
	let listProperties={
	  add:(item)=>{
	    if(listArray.indexOf(item)<0){
	      listArray.push(item);
	    }
	    return nhr.extend(listProperties);
	  },
	  addTo:(index,item)=>
	  {
	    listArray.splice(index,1,item);
	    return nhr.extend(listProperties);
	  },
	  get:(index)=>
	  {
	    if(typeof index==='number' && listArray.length>index>(-1)){return listArray[index];}
	  },
	  values:()=>{return listArray;},
	  clear:()=>
	  {
	    while(listArray.length>0){listArray.pop()}
	    return nhr.extend(listProperties);
	  },
	  join:(array)=>
	  {
	    if(typeof array==="object")
	    {
	      for(let item of array)
	      {nhr.extend(listProperties).add(item)}
	    }
	    return nhr.extend(listProperties);
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
	  size:()=>listArray.length,
	  delete:(item)=>
	  {
	    let i=listArray.indexOf(item);
	    if(nhr.extend(listProperties).has(item)){listArray.splice(i,1);};
	    return nhr.extend(listProperties);
	  },
	  replace:(item1,item2)=>
	  {
	 	if(nhr.extend(listProperties).has(item1)){
	 		let index = listArray.indexOf(item1);
	 		listArray.splice(index,1,item2);
	 	}
	 	return nhr.extend(listProperties);
	  },
	  
	  pop:()=>{listArray.pop();return nhr.extend(listProperties); }
	  
	}
		
	return nhr.extend(listProperties);
}


/* THE MAP OBJECT */


function HashMap(arr){	
	let listArray=[];
	if(arr!=undefined)
	{
	  for(let item of arr)
	  {
	    if(typeof item==="string")
	    {
	      listArray.push(item);
	    }
	  }
	}
	
	let listProperties={	  
	  indexOf:(key)=>
	  {
	    let values=[];
	    listArray.forEach((it,i)=>{
	      if(it[0]===key)
	      {
	        values.push(listArray.indexOf(it));
	      }
	    });
	    return values[0];
	  },
	  get:(key)=>
	  {
	    let values=[];
	    listArray.forEach((it,i)=>{
	      if(it[0]===key)
	      {
	        values.push(it[1]);
	      }
	    });
	    return values[0];
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
	    return nhr.extend(listProperties);
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
	  has:(key)=>
	  {
	    let bools=[];
	    for(let it of listArray)
	    {
	      if(it[0]===key){bools.push(true);}
	    }
	    if(bools.length<1)
	    {return false;}
	    else{return true;}
	  },
	  set:(key,val)=>
	  {
	    if(nhr.extend(listProperties).has(key))
	    {
	      let i=nhr.extend(listProperties).indexOf(key);
	      listArray[i]=[key,val];
	    }
	    else
	    {
	      listArray.push([key,val]);
	    }
	    return nhr.extend(listProperties);
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,i)=>
	    {
	      let k=item[0];
	      let v=item[1];
	      fun(k,v,i);
	    });
	    return nhr.extend(listProperties);
	  },
	  join:(obj)=>
	  {
	    for(let k in obj)
	    {
	      nhr.extend(listProperties).set(k,obj[k]);
	    }
	    return nhr.extend(listProperties);
	  },
	  clear:()=>{while(listArray.length>0){listArray.pop()}return nhr.extend(listProperties);},
	  entries:()=>listArray,
	  size:()=>listArray.length,
	  toObject:(noLength)=>{	  	
	  	let newObj = {};
	  	for(let entry of listArray){ newObj[entry[0]]=entry[1]; }
	  	return newObj;	  	
	  }
	}
		
	return nhr.extend(listProperties);
}


