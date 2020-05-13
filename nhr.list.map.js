/* THE LIST OBJECT */

function nhrList(arr){	
	let listArray=[];
	if(typeof arr==="object")
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
	    if(typeof index==="number" && listArray.length>index>(-1)){return listArray[index];}
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
	    if(typeof array==="object")
	    {
	      for(let item of array)
	      {listProperties.add(item)}
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
	    if(typeof item==="string")
	    {
	      listArray.push(item);
	    }
	  }
	}
	
	const listProperties={	  
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
	    if(listProperties.has(key))
	    {
	      let i=listProperties.indexOf(key);
	      listArray[i]=[key,val];
	    }
	    else
	    {
	      listArray.push([key,val]);
	    }
	    return listProperties;
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,i)=>
	    {
	      let k=item[0];
	      let v=item[1];
	      fun(k,v,i);
	    });
	    return listProperties;
	  },
	  join:(obj)=>
	  {
	    for(let k in obj)
	    {
	      listProperties.set(k,obj[k]);
	    }
	    return listProperties;
	  },
	  clear:()=>{listArray=[];return listProperties;},
	  entries:()=>listArray,
	  size:()=>listArray.length
	}
	return listProperties;
}


