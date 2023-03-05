import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProfile, logout } from '../redux/actions/userAction';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const isUser = JSON.parse(localStorage.getItem("userInfo"))

  const [userInfo, setUserInfo] = useState({
    fullname: isUser.fullname,
    birthday: isUser.birthday,
    email: isUser.email,
    phone: isUser.phone
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userInfo.phone === "") {
      addToast("Số điện thoại không được để trống", { appearance: "error", autoDismiss: true });
    } else if (userInfo.phone.length < 9 || userInfo.phone.length > 10) {
      addToast("Số điện thoại chưa đúng", { appearance: "error", autoDismiss: true });
    } else {
      dispatch(editProfile(userInfo, addToast));

    }
  }

  const logoutHandler = () => {
    logout(navigate)
    navigate('/')
    // window.location.reload("/")
    addToast("Đã Hủy", { appearance: "success", autoDismiss: true });
  }

  return (
    <div className="form">
      <div className="form-panel one">
        <div className="form-header form-header-left">
          <h1>Profile</h1>
        </div>
        <div className="form-content">
          <form >
            <div className="form-group form-group-lab">
              <label htmlFor="fullname">Fullname:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={ userInfo.fullname }
                onChange={ handleChange }
                required="required"
                placeholder='Fullname'
              />
            </div>
            <div className="form-group form-group-lab">
              <label htmlFor="birthday">Day of Birth:</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={ moment(userInfo.birthday).format('YYYY-MM-DD') }
                onChange={ handleChange }
                required="required"
                placeholder='Day of Birth'
              />
            </div>
            <div className="form-group form-group-lab">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={ userInfo.email }
                onChange={ handleChange }
                required="required"
                placeholder='example@gmail.com'
              />
            </div>
            <div className="form-group form-group-lab">
              <label htmlFor="phone">Phone:</label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={ userInfo.phone }
                onChange={ handleChange }
                required="required"
                placeholder='Phone'
              />
            </div>
            <div className="form-group form-group2">
              <button type="submit" onClick={ onSubmit }>Update</button>
              <button type="submit" onClick={ logoutHandler } className="btn-custom">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;