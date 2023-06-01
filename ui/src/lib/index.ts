import { AxiosInstance } from "axios";

export type MyProp = {
	axios: AxiosInstance;
}

export type MyUser = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}

export const LOCAL_STORAGE_NAME = "docker_test"

export const getAccessToken = () => localStorage.getItem(LOCAL_STORAGE_NAME)
export const setAccessToken = (access_token: string) => localStorage.setItem(LOCAL_STORAGE_NAME, access_token)
export const clearAccessToken = () => localStorage.clear()

export const setValueOnKeyDown = (value: string, setter: React.Dispatch<React.SetStateAction<any>>): void => setter(value)

export const validateSession = async (axios: AxiosInstance): Promise<boolean> => {
	try {
		const { data } = await axios.post('/api/session/validate', {}, {
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		})

		return data.success
	} catch(err: any) {
		console.error(err.message)
	}

	clearAccessToken()
	return false
}

export type LoginOptions = {
	username: string;
	password: string;
}

export type SignupOptions = {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	confirmPassword: string;
}

