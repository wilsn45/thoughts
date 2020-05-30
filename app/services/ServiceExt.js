export async function responseBuilderAPI(resp) {
  if(resp && resp.status == 200) {
    return {success : true, data : resp.data, error: null}
  }
  return {success : false, data : null, error: "We are broken"}
}

export async function responseBuilderFirestore(success,data) {
  if(success) {
    return {success : true, data : data, error: null}
  }
  return {success : false, data : null, error: "We are broken"}
}
