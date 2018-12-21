import React from "react";
import styles from "./Category.module.css";
import { useEditableInput } from "./useEditableInput";

interface Props {
  categoryId: string;
  categoryName: string;
  mode: "editing" | "answering";
  onCategoryEdit: (categoryEdit: ICategory) => void;
}

export function Category(props: Props) {
  const { categoryId, categoryName, mode, onCategoryEdit } = props;

  const initialCategory = {
    id: categoryId,
    name: categoryName
  };

  const { isDirty, value, setValue } = useEditableInput<ICategory>(
    initialCategory
  );

  const handleOnEditSubmit = () => onCategoryEdit(value);

  const getContent = () => {
    switch (mode) {
      case "editing":
        return (
          <React.Fragment>
            <input
              type="text"
              value={value.name}
              onChange={event =>
                setValue({ ...value, name: event.currentTarget.value })
              }
            />
            {isDirty && (
              <button onClick={handleOnEditSubmit}>Save changes</button>
            )}
          </React.Fragment>
        );
      case "answering":
        return <p>{value.name}</p>;
    }
  };

  return <div className={styles.category}>{getContent()}</div>;
}
