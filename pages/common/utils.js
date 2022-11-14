function randomNum(prefix,number){
	// console.log("===prefix===",prefix)
	// console.log("===number===",number)
	let num = ""
	for(let i = 0;i<number;i++){
		num += Math.floor(Math.random()*10)
	}
	return prefix+""+ num
}

export {randomNum}