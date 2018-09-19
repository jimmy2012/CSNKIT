const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if ((type === "UPDATE" || type === "CREATE") && (resource === "banners" || resource === "covers" || resource === "guides")) {
    // only one image
    if (Array.isArray(params.data.image))
      params.data.image = params.data.image[0]

    if (checkInputNewImage(params, "image")) {
      return makeRequestHandlerParams(
        params,
        newPrams => requestHandler(type, resource, newPrams),
        "image"
      )
    }
  }

  if ((type === "UPDATE" || type === "CREATE") && resource === "users") {
    // only one avatar
    if (Array.isArray(params.data.avatar))
      params.data.avatar = params.data.avatar[0]

    if (checkInputNewImage(params, "avatar")) {
      return makeRequestHandlerParams(
        params,
        newPrams => requestHandler(type, resource, newPrams),
        "avatar"
      )
    }
  }

  return requestHandler(type, resource, params)
}

const checkInputNewImage = (params, imageParamName = "image") => {
  if (
    params.data[imageParamName] &&
    params.data[imageParamName].rawFile instanceof File
  ) {
    return true
  } else {
    return false
  }
}

const makeRequestHandlerParams = (
  params,
  callback,
  imageParamName = "image"
) => {
  const file = params.data[imageParamName].rawFile
  return convertFileToBase64(file)
    .then(base64Image => ({
      uri: base64Image,
      name: `${file.name}`,
      type: `${file.type}`,
      size: file.size
    }))
    .then(transformedNewImage => {
      let newParms = {
        ...params,
        data: {
          ...params.data
        }
      }

      newParms.data[imageParamName] = { ...transformedNewImage
      }
      return callback(newParms)
    })
}

export default addUploadCapabilities