import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar"
import {createUrqlClient} from "../utils/createUrqlClient";

const Index = () => (
    <>
    <NavBar />
    <div>hello World</div>
    </>
);
export default withUrqlClient(createUrqlClient)(Index);