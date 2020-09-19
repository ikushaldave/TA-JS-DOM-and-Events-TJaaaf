let userInfo = {};
let form = document.querySelector("form");
const p = document.createElement("p");

function some(arr, cb) {
	return [...arr].some((e) => !cb(e));
}

function highlight(test, e) {
	if (test) {
		e.parentElement.classList.add("error");
	} else {
		e.parentElement.classList.remove("error");
		e.parentElement.classList.add("success");
	}
}

function validation(e) {
	const usernameValid = userInfo.username.length > 4;
	const isNameNum = !some(userInfo.name, isNaN) && userInfo.name.length > 6;
	const isEmailVaid = (function (e) {
		return e.includes("@") && e.indexOf("@") > 5 ? true : false;
	})(userInfo.email);
	const phoneValid = !isNaN(userInfo.phone) && userInfo.phone.length > 6;
	const passwordValid = some(userInfo.password, isNaN) && (userInfo.password.includes("@") || userInfo.password.includes("$")) && userInfo.password.length > 6;
	const passwordRetypeValid = userInfo.password === userInfo["password-check"] && passwordValid;

	[...form.querySelectorAll("small")].forEach((i) => {
		i.remove();
	});

	if (!usernameValid) {
		const small = document.createElement("small");
		small.innerText = `Username can't be less than 4 characters`;
		e.username.parentElement.append(small);
		highlight(true, e.username);
	} else {
		highlight(false, e.username);
	}

	if (!isNameNum) {
		const small = document.createElement("small");
		small.innerText = `You can't use number in the name field`;
		e.name.parentElement.append(small);
		highlight(true, e.name);
	} else {
		highlight(false, e.name);
	}

	if (!isEmailVaid) {
		const small = document.createElement("small");
		small.innerText = `Not a valid email`;
		e.email.parentElement.append(small);
		highlight(true, e.email);
	} else {
		highlight(false, e.email);
	}

	if (!phoneValid) {
		const small = document.createElement("small");
		small.innerText = `Phone number can only contain numbers`;
		e.phone.parentElement.append(small);
		highlight(true, e.phone);
	} else {
		highlight(false, e.phone);
	}

	if (!passwordValid) {
		const small = document.createElement("small");
		small.innerText = `Password must contain at least a symbol and a number`;
		e.password.parentElement.append(small);
		highlight(true, e.password);
	} else {
		highlight(false, e.password);
	}

	if (!passwordRetypeValid) {
		const small = document.createElement("small");
		small.innerText = `Password does not match`;
		e["password-check"].parentElement.append(small);
		highlight(true, e["password-check"]);
	} else {
		highlight(false, e["password-check"]);
	}

	console.log(usernameValid, isNameNum, isEmailVaid, phoneValid, passwordValid, passwordRetypeValid);

	if (usernameValid && isNameNum && isEmailVaid && phoneValid && passwordValid && passwordRetypeValid) {
		p.innerText = "User Added Successfully!";
		form.append(p);
		[...e].forEach((i) => {
			i.value = "";
			i.parentElement.classList.remove("success");
		});
		console.log("valid");
	} else {
		p.remove();
	}
}

function handleSubmit(e) {
	e.preventDefault();
	[...e.target].forEach((i) => {
		userInfo[i.name] = i.value;
	});

	validation(e.target);
}

form.addEventListener("submit", handleSubmit);
