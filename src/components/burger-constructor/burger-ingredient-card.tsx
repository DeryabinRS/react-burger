import { FC, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { useAppDispatch } from "../../hooks/redux";
import { selectedIngredientDelete } from "../../services/store/reducers/ingredients-slice";

interface BurgerIngredientCardType{
	index: number; //unique key
	item: any;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerIngredientCard: FC<BurgerIngredientCardType> = ({item, index, moveCard}, props) => {
	const ref = useRef<HTMLInputElement>(null)
	const dispatch = useAppDispatch()

	const [{ isDragging }, drag] = useDrag({
		type: 'ingredientCard',
		item: () => {
		  return { index }
		},
		collect: (monitor:any) => ({
		  isDragging: monitor.isDragging(),
		}),
	})

	const [{ handlerId }, drop] = useDrop({
		accept: 'ingredientCard',
		collect(monitor) {
		  return {
			handlerId: monitor.getHandlerId(),
		  }
		},
		hover(item:any, monitor) {
		  if (!ref.current) {
			return
		  }
		  const dragIndex = item.index
		  const hoverIndex = index
		  if (dragIndex === hoverIndex) {
			return
		  }
		  const hoverBoundingRect = ref.current?.getBoundingClientRect()
		  const hoverMiddleY =
			(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		  const clientOffset: any = monitor.getClientOffset()
		  const hoverClientY = clientOffset.y - hoverBoundingRect.top
		  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		  }
		  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		  }
		  moveCard(dragIndex, hoverIndex)
		  item.index = hoverIndex
		},
	  })

	const opacity = isDragging ? 0 : 1

  	drag(drop(ref))

	return (
		<div ref={ref} className={`${styles.element} pt-2 pb-2`} style={{opacity}} data-handler-id={handlerId}>
			<div className="pr-2">
				<DragIcon type="primary" />
			</div>
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image_mobile}
				handleClose={() => dispatch(selectedIngredientDelete(item.dragId))}
			/>
		</div>
	);
};

export default BurgerIngredientCard;
