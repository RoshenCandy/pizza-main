/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useRef } from 'react';
import Categories from '../components/Categories';
import Sort, { sortBy } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/skeleton';
import axios from 'axios';
import qs from 'qs';
import { searchContext } from '../../pages/index';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useRouter } from 'next/router';

function Home() {
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortName;
  const { searchValue } = useContext(searchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const { push } = useRouter();

  const getPizzas = () => {
    setIsLoading(true);

    axios
      .get(
        `${process.env.DOMAIN_URL}/api/pizza?sortBy=${sort.sortName}&categoryId=${categoryId}&currentPage=${currentPage}&limit=20&search=${searchValue}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPizzas();

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify({
        sortProperty: sort.sortName,
        categoryId,
        currentPage,
      });

      push(`?${query}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortBy.find((obj) => obj.sortName === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, []);

  return (
    <div className="container home">
      <div className="content__top">
        <Categories id={categoryId} changeCategory={(i) => onClickCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : items.map((pizza) => <PizzaBlock {...pizza} key={pizza._id} />)}
      </div>
    </div>
  );
}

export default Home;
