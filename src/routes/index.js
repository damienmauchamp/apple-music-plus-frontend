import TestPage from "../pages/TestPage";
import SecondPage from "../pages/SecondPage";
import ThirdPage from "../pages/ThirdPage";

const routes = [
	{
		path: '/',
		component: TestPage,
	},
	{
		path: '/second/',
		component: SecondPage,
	},
	{
		path: '/second/thrid/',
		component: ThirdPage,
	}
]

export default routes