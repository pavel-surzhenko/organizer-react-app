import { useDispatch, useSelector } from 'react-redux';
import { ITag } from '../../api';
import { tagsActions } from '../../lib/redux/actions';
import { getTagId } from '../../lib/redux/selectors';

export const Tag: React.FC<ITag> = (props) => {
    const dispatch = useDispatch();
    const selectedTag = useSelector(getTagId)

    const handleClick = () => {
        dispatch(tagsActions.setTagId(props.id));
    };

    return (
        <span
            onClick={handleClick}
            className={`tag ${selectedTag === props.id ? 'selected' : ''}`}
            style={{
                color: `${props?.color}`,
                backgroundColor: `${props?.bg}`,
            }}
        >
            {props.name}
        </span>
    );
};
