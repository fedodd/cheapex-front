import React, { useState, useCallback } from "react";
import classes from './Search.pcss';
import { debounce } from "lodash";

const search = (props) => {

  const [userQuery, setUserQuery] = useState("");
  const delayedQuery = useCallback(debounce(q => props.filterHandler(q), 500), []);
  const onChange = (e) => {
    setUserQuery(e.target.value);
    delayedQuery(e.target.value);
  };

  return (
			<div>
				<input
					className={classes.search}
					type="text"
					placeholder="www, ИНН, название компании, город"
					// onChange={props.filterHandler}
					onChange={onChange}
					value={userQuery}
					id="searchFilter"
				></input>
			</div>
		);
};

export default search;
