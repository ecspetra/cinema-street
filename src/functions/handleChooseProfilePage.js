import { getCurrentUserFromDatabase } from "./getCurrentUserFromDatabase";

export const handleChooseProfilePage = (profileLink, handleClearProfilePage, handleClearFriends, handleSetProfilePage) => {
	handleClearProfilePage();
	handleClearFriends();
	getCurrentUserFromDatabase(profileLink).then((userInfo) => {
		handleSetProfilePage(userInfo)
	});
}