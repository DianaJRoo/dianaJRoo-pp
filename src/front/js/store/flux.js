const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
			currentUser: async (token) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + "/api/currentUser", {
						method: "GET",

						headers: {
							"Access-Control-Allow-Credentials": true,
							"Authorization": 'Bearer ' + token
						}
					});
					const data = await res.json();
					if (!res.ok) throw new Error("Invalid credentials");

					return data;
				} catch (error) {
					console.error("Error logging in:", error);
					return false;
				}
			},
			updateUser: async (token, user,) => {
				try {

					const res = await fetch(process.env.BACKEND_URL + "/api/user", {
						method: "PUT",
						body: JSON.stringify({
							username: user.username,
							first_name: user.first_name,
							password: user.password,


						}),

						headers: {
							"Access-Control-Allow-Credentials": true,
							"Authorization": 'Bearer ' + token,
							"Content-Type": "application/json"
						}
					});


					if (res.status === 409) {
						console.error("El usuario ya existe");
						//return false; 
					}
					const data = await res.json();
					if (!res.ok){
						throw new Error(data.msg)
					}  
					return true; 
				} catch (error) {
					console.log(error.message)
					if (error.message == "Username already exists" || error.message == "Email already exists"){
						throw new Error(error.message); 
					}
					console.log(error.message)
					console.error("Error al crear un nuevo usuario:", error);
					return false; 
				}
			},

			login: async (userInfo) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						body: JSON.stringify(userInfo),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const data = await res.json();
					if (!res.ok) throw new Error("Invalid credentials");

					// Guardar el token en sessionStorage
					sessionStorage.setItem("userData", JSON.stringify(data));

					setStore({ userToken: data });
					return true;
				} catch (error) {
					console.error("Error logging in:", error);
					return false;
				}
			},
			createNewUser: async (userInfo) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + '/api/register', {
						method: "POST",
						body: JSON.stringify(userInfo),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (res.status === 409) {
						console.error("El usuario ya existe");
						//return false; 
					}
					const data = await res.json();
					if (!res.ok){
						throw new Error(data.msg)
					}  
					return true; 
				} catch (error) {
					console.log(error.message)
					if (error.message == "Username already exists"){
						throw new Error(error.message); 
					}
					console.log(error.message)
					console.error("Error al crear un nuevo usuario:", error);
					return false; 
				}
			},

			logOut: () => {
				console.log('out')
				sessionStorage.clear()
				setStore({ userToken: "" })
				window.location.href = '/hero'
			},




		}
	};






};





export default getState;
