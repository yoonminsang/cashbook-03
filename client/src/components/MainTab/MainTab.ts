const MainTab = ({
  date,
  slide,
  classificationList,
  isIncome,
  categoryList,
  category,
  paymentList,
  payment,
  content,
  amount,
  modal,
  isActive,
  timestamp,
}) => {
  console.log('maintab', content, amount);
  const isIncomeToBoolean = Boolean(isIncome);

  const year = date && date.year;
  const month = date && (date.month < 10 ? '0' + date.month : date.month);
  const tempDatee = new Date().getDate();
  const datee = tempDatee < 10 ? '0' + tempDatee : tempDatee;

  const now = timestamp
    ? `value='${timestamp}'`
    : `value='${year}-${month}-${datee}'`;
  const min = date && `min= "${year}-${month}-01"`;
  const max =
    date && `max="${year}-${month}-${new Date(year, month, 0).getDate()}"`;

  const classificationInner = isIncomeToBoolean ? '수입' : '지출';
  const categoryInner = category.name ? category.name : '선택하세요';
  const paymentInner = payment.name ? payment.name : '선택하세요';
  const operator = isIncomeToBoolean ? '+' : '-';

  const filterClassficationList = classificationList
    .map(
      ({ name, is_income }, index) =>
        `<li ${
          isIncome == is_income ? 'class="active"' : ''
        }data-index=${index}>${name}</li>`,
    )
    .join('');

  const filterCategoryList = categoryList
    ? categoryList
        .filter(({ is_income }) => is_income === isIncomeToBoolean)
        .map(
          ({ id, name }) =>
            `<li data-id=${id} data-name=${name} ${
              category && (id === +category.id ? 'class="active"' : '')
            }>${name}</li>`,
        )
        .join('')
    : '';

  const filterPaymentList = paymentList
    ? paymentList
        .map(
          ({ id, name }) =>
            `<li data-id=${id} data-name=${name}>${name}<button class="wci wci-close js-remove-payment"></button></li>`,
        )
        .join('')
    : '';

  return /*html*/ `
    <form class="main-tab-inner">
        <div class="date">
            <div class="sub-head">일자</div>
            <input class="sub-content" type="date" ${min ? min : ''} ${
    max ? max : ''
  } ${now ? now : ''}/>
        </div>

        <div class="classification">
            <div class="sub-head">분류</div>
            <div class="flex js-btn-slide js-btn-classification">
                <div class="sub-content">${classificationInner}</div>
                <i class="wci wci-chevron-down label"></i>
            </div>
            <ul ${
              slide === 0
                ? 'class="drop-down drop-down-classification"'
                : 'class="drop-down drop-down-classification blind"'
            } >
                ${filterClassficationList}
            </ul>
        </div>

        <div class="category">
            <div class="sub-head">카테고리</div>
            <div class="flex js-btn-slide js-btn-category">
                <div class="sub-content ${
                  category.name ? '' : 'label'
                }">${categoryInner}</div>
                <i class="wci wci-chevron-down label"></i>
            </div>
            <ul ${
              slide === 1
                ? 'class="drop-down drop-down-category"'
                : 'class="drop-down drop-down-category blind"'
            } >
                ${filterCategoryList}
            </ul>
        </div>

        <div class="content">
            <div class="sub-head">내용</div>
            <input type="text" value="${content}" class="sub-content input-content" placeholder="입력하세요" maxLength="45"/>
        </div>

        ${
          !isIncomeToBoolean
            ? `<div class="payment">
                <div class="sub-head">결제수단</div>
                <div class="flex js-btn-slide js-btn-payment">
                    <div class="sub-content ${
                      payment.name ? '' : 'label'
                    }">${paymentInner}</div>
                    <i class="wci wci-chevron-down label"></i>
                </div>
                <ul ${
                  slide === 2
                    ? 'class="drop-down drop-down-payment"'
                    : 'class="drop-down drop-down-payment blind"'
                } >
                    ${filterPaymentList}
                    <li class="js-modal-payment">추가하기</li>
                </ul>
              </div>`
            : ''
        }

        <div class="amount">
            <div class="sub-head">금액</div>
            <div class="flex">
                <div class="sub-content operator">${operator}</div>
                <input type="text" value="${amount}" class="sub-content input-amount" placeholder="입력하세요" maxLength="15"/>
            </div>
        </div>

        <button class="save-button-large ${
          isActive ? 'active' : ''
        }" type="submit"><i class="wci wci-check"></i></button>
    </form>
    <div ${modal ? 'class="modal"' : 'class="modal blind"'} >
        <div class="modal-content">
            <div class="modal-title">추가하실 결제수단을 적어주세요.</div>
            <input type="text" class="modal-input" placeholder="입력하세요"/>
            <div class="modal-flex">
                <button class="cancel js-modal-cancel">취소</button>
                <button class="add js-add-payment">등록</button>
            </div>
        </div>
    </div>
  `;
};
export default MainTab;
