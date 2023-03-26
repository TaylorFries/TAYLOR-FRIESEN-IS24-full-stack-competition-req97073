import { useParams } from 'react-router-dom';
import products from './product-content'
import NotFound from './NotFound';

const ProjectPage = () => {
    const { projectId } = useParams();
    const project = products.find(project => project.productId === projectId );

    if(!project){
        return <NotFound />
    }

    return(
        <>
        <h1>{project.productId}</h1>
        Name:  {project.productName}
        {project.Developers.map((dev_name, i) => (
            <p key={i}>{dev_name}</p>
        ))}
        </>
    );
} 

export default ProjectPage;