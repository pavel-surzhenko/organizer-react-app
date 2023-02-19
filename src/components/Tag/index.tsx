import { ITag } from '../../api';

export const Tag: React.FC<ITag> = (props) => {
    return (
        <span
            className='tag'
            style={{
                color: `${props?.color}`,
                backgroundColor: `${props?.bg}`,
            }}
        >
            {props.name}
        </span>
    );
};
