import {
	faUser,
	faTruckRampBox,
	faBoxArchive,
} from '@fortawesome/free-solid-svg-icons';
// https://my-delivery-app-wytd7t5ava-uc.a.run.app
export const baseUrl = 'https://delivery-app-back-43wjgjaw5a-ey.a.run.app';

export const registrationEmailField: string = 'Email';

export const registrationUserNameField: string = 'Name';

export const registrationUserNameText: string = 'Username';

export const registrationPasswordField: string = 'Password';

export const registrationRoleField: string = 'Role';

export const buttonLogin: string = 'Login';

export const forgetPassword: string = 'Forgot Password?';

export const logoutButton: string = 'Logout';

export const emailError: string = 'Email should be required';

export const emailInvalidError: string = 'Invalid email';

export const userNameError: string = 'UserName should be required';

export const userNameLengthError: string =
	'Length must be at least 3 characters';

export const passwordError: string = 'Password should be required';

export const passwordLengthError: string =
	'Length must be at least 6 characters';

export const roleError: string = 'Role should be required';

export const cancel: string = 'Cancel';

export const submit: string = 'Submit';

export const save: string = 'Save';

export const enterNewPassword: string = 'Enter new password';

export const passwordChangedSucc: string = 'Password changed successfully';

export const backToMainPage: string = 'Back to home page';

export const emptyActiveLoads: string = `You don't have any active loads yet.`;

export const logoutText: string = 'Logout';

export const profileText: string = 'Profile';

export const uploadPhoto: string = 'Upload a photo';

export const deletePhoto: string = 'Delete photo';

export const enterOldPass: string = 'Enter an old password';

export const enterNewPass: string = 'Enter a new password';

export const confirmPass: string = 'Confirm the password';

export const passwordsMatch: string = 'Passwords must match';

export const addTruckButton: string = 'Add truck';

export const addLoadButton: string = 'Add load';

export const typeTruck: string = 'Type of truck';

export const typeTextLabel: string = 'Type';

export const status: string = 'Status';

export const StateText: string = 'State';

export const assignedTo: string = 'Assigned to';

export const createdDate: string = 'Created date';

export const loadName: string = 'Load name';

export const dimensionsText: string = 'Dimensions';

export const loadPayloadText: string = 'Load payload';

export const pickupAddress: string = 'Pickup address';

export const deliveryAddress: string = 'Delivery address';

export const update: string = 'Update';

export const deleteProfileQuestion: string =
	'Are you sure you want to delete the profile?';

export const noText: string = 'No';

export const yesText: string = 'Yes';

export const deleteText: string = 'Delete';

export const details: string = 'Details';

export const assignTruckText: string = 'Assign the truck';

export const enterType: string = 'Enter type...';

export const typeError: string = 'Type should be required';

export const invalidType: string = 'Invalid type';

export const addChanges: string = 'Add changes';

export const userInfo: string = 'Created by/User Id';

export const filterByNameText: string = 'Filter by name...';

export const truckSearch: string = 'Truck search';

export const createLoadTitle: string = 'Create load';

export const updateLoadTitle: string = 'Update load';

export const enterNameText: string = 'Enter name...';

export const payloadText: string = 'Payload';

export const nameError: string = 'Name should be required';

export const nameErrorLength: string = 'Length must be at least 4 characters';

export const nameErrorString: string = 'Name should be a string';

export const enterPayloadText: string = 'Enter payload...';

export const payloadError: string = 'Payload should be required';

export const payloadErrorNumber: string = 'Payload should be a number';

export const pickupAddressText: string = 'Pickup address';

export const pickupError: string = 'Pickup address should be required';

export const pickupErrorString: string = 'Pickup address should be a string';

export const pickupErrorLength: string =
	'Length must be at least 15 characters';

export const payloadErrorLength: string =
	'Payload should be no higher than 4000';

export const enterPickupAdress: string = 'Enter pickup address...';

export const errorAdresses: string = 'Addresses must not match';

export const enterDeliveryAddressText: string = 'Enter delivery address...';

export const deliveryAddressText: string = 'Delivery address';

export const deliveryAddressError: string =
	'Delivery address should be required';

export const deliveryAddressErrorString: string =
	'Delivery address should be a string';

export const validTypeTruckText: string =
	'Available truck types: sprinter, small stright, large stright';

export const enterDimensionsText: string = 'Enter dimensions:';

export const widthText: string = 'Width';

export const enterWidthText: string = 'Enter width...';

export const widthError: string = 'Width should be required';

export const widthErrorNumber: string = 'Width should be a number';

export const widthErrorLength: string = 'Width should be no higher than 700';

export const enterLengthText: string = 'Enter length...';

export const lengthText: string = 'Length';

export const lengthError: string = 'Length should be required';

export const lengthErrorNumber: string = 'Length should be a number';

export const lengthErrorLength: string = 'Length should be no higher than 350';

export const enterHeightText: string = 'Enter height...';

export const heightText: string = 'Height';

export const heightError: string = 'Height should be required';

export const heightErrorNumber: string = 'Height should be a number';

export const heightErrorLength: string = 'Height should be no higher than 200';

export const changeNextStateBtn: string = 'Change to next state';

export const pickUpLoadBtn: string = 'Pick up load';

export const truckInfo: string = 'Truck info';

export const truckId: string = 'Truck ID';

export const loadId: string = 'Load ID';

export const emptyTrucksLoads: string = `You haven't created any`;

export const yet: string = 'yet';

export const loadsText: string = 'loads';

export const trucksText: string = 'trucks';

export const activeLoadsSideBar = 'Active Loads';

export const archiveLoadsSideBar = 'Archive Loads';

export const styleInputForgotPassword = {
	width: '62vh',
	paddingBottom: 0,
	border: '0.1vh solid lightgrey',
	borderRadius: '0.5vh',
	paddingLeft: '2vh',
};

export const styleBtnForgotPassCancel = {
	marginLeft: '4vh',
	backgroundColor: 'rgb(219, 165, 17)',
	border: 'none',
	color: 'white',
};

export const styleCreateCardShipper = {
	width: '60vh',
	marginBottom: '1vh',
	paddingLeft: '1vh',
	':focus': {
		borderColor: 'red',
	},
};

export const styleInputCreateCard = {
	width: '45vh',
	paddingLeft: '1vh',
};

export const styleButtonErrorBack = {
	background: 'rgb(219, 165, 17)',
	color: 'white',
	border: 'none',
};

export const styleButtonErrorHome = {
	background: 'rgb(219, 165, 17)',
	color: 'white',
	border: 'none',
	marginLeft: '3vh',
};

export const forgotPasswordEmailText = 'Enter your registered email';

export const passwordChangeInstructions =
	'Password change instructions have been sent to your email';

export const goToLoginPage: string = 'Go to Login page';

export const editPersonalData: string = 'Edit personal data';

export const changePassword: string = 'Change password';

export const deleteProfileText: string = 'Delete profile';

export const withoutSortText = 'Without sort';

export const isDisabled = {
	color: '#96b6dc',
};

export const active = {
	backgroundColor: 'rgb(219, 165, 17)',
	color: 'white',
	border: 'none',
};

export const styleLogin = {
	borderTop: 'none',
	borderRight: 'none',
	borderLeft: 'none',
	borderBottom: '.2vh solid lightgrey',
	paddingBottom: 0,
};

export const styleBtnUploadPhoto = {
	border: 'none',
	fontSize: '1.1em',
	width: '20vh',
};

export const styleBtnDeleteProfileNo = {
	background: 'rgb(219, 165, 17)',
	border: 'none',
	color: 'white',
};

export const changeBackground = (e: any) => {
	e.target.style.background = 'rgb(219, 165, 17)';
	e.target.style.border = 'none';
	e.target.style.color = 'white';
};

export const changeBackgroundLeave = (e: any) => {
	e.target.style.background = 'white';
	e.target.style.border = '.1vh solid  rgb(254, 202, 62)';
	e.target.style.color = 'black';
};

export const styleChangeEmailInput = {
	paddingLeft: '1vh',
	width: '50vh',
};

export const styleChangeUsernameInput = {
	paddingLeft: '1vh',
	marginBottom: '2vh',
	width: '50vh',
};

export const styleChangeOldPassword = {
	paddingLeft: '1vh',
	width: '50vh',
	borderRight: 'none',
	borderWidth: '.1vh',
};

export const styleChangeNewPassword = {
	paddingLeft: '1vh',
	width: '50vh',
	borderRight: 'none',
	borderWidth: '.1vh',
};

export let valuesDriver = {
	height: '35vh',
	width: '60vh',
};
export let valuesShipper = {
	height: '120vh',
	width: '80vh',
	top: '1%',
};

export const styleBtnChangeNextState = {
	width: '20vh',
};

export const stylesBtnCreateTruckLoad = {
	margin: '5vh 0 3vh 0',
};

export const sideBar = [
	{
		label: 'Active Loads',
		icon: faTruckRampBox,
		id: '3',
		to: '/main-page/active-loads',
	},
	{
		label: 'Archive Loads',
		icon: faBoxArchive,
		id: '1',
		to: '/main-page/archive-loads',
	},
	{
		label: 'Profile',
		icon: faUser,
		id: '4',
		to: '/main-page/profile',
	},
];

export const menuItemsTrucks = [
	'type Asc',
	'type Desc',
	'createdDate Asc',
	'createdDate Desc',
];
export const menuItemsLoads = [
	'name Asc',
	'name Desc',
	'createdDate Asc',
	'createdDate Desc',
];

export const sideMenu = [
	{
		label: 'Profile',

		to: '/profile',
	},
	{
		label: 'Change Password',
		to: '/change-user_pass',
	},
];
