
export function addStatus(params){
  return {
      type:'ADD_STATUS',
      payload:{label:params.label,value:params.value}
  }
}