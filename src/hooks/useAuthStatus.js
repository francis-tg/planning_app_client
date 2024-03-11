import { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../api/index";

export function useAuthStatus() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const isMounted = useRef(true);
	useEffect(() => {
		if (isMounted) {
			//const auth = sessionStorage.getItem("token");
			fetch(`${BASE_URL}/user/me`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			}).then(async (r) => {
				if (r.status === 200) {
					//const auth = sessionStorage.getItem("token");
					//if (auth) {
					setLoggedIn(true);
					//}
					setCheckingStatus(false);
				} else {
					setCheckingStatus(false);
				}
			});
		}

		return () => {
			isMounted.current = false;
		};
	}, [isMounted]);

	return { loggedIn, checkingStatus };
}
