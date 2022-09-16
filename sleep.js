async function wait(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

async function sleep(delay) {
  const date1 = new Date().getTime()
  await wait(delay)
  console.log(new Date().getTime() - date1)
}


sleep(1500)
