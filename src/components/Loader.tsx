import { ClipLoader } from "react-spinners";

const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <ClipLoader color="#01B399" size={150} loading={loading} />
    )
}

export default Loader
