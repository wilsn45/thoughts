export async function responseBuilder(resp) {
  if(resp && resp.status == 200) {
    return {success : true, data : resp.data, error: null}
  }
  return {success : false, data : null, error: "We are broken"}
}
