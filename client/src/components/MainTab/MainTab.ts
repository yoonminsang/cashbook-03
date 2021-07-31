const MainTab = ({}) => {
  return /*html*/ `
  <div class="main-tab">
    <div class="main-tab-inner">
        <div class="date">
            <div class="sub-head">일자</div>
            <div class="sub-content">20210731</div>
        </div>
        <div class="classification">
            <div class="sub-head">분류</div>
            <div class="flex">
                <div class="sub-content label">선택하세요</div>
                <i class="wci wci-chevron-down label"></i>
            </div>
            <ul class="drop-down">
               <li>생활</li> 
               <li>식비</li> 
               <li>여가</li> 
            </ul>
        </div>
        <div class="category">
            <div class="sub-head">카테고리</div>
            <div class="flex">
                <div class="sub-content label">선택하세요</div>
                <i class="wci wci-chevron-down label"></i>
            </div>
        </div>
        <div class="content">
            <div class="sub-head">내용</div>
            <input type="text" class="sub-content input-content" placeholder="입력하세요" maxLength="45"/>
        </div>
        <div class="payment">
            <div class="sub-head">결제수단</div>
            <div class="flex">
                <div class="sub-content label">선택하세요</div>
                <i class="wci wci-chevron-down label"></i>
            </div>
        </div>
        <div class="price">
            <div class="sub-head">금액</div>
            <div class="flex">
                <div class="sub-content operator">-</div>
                <input class="sub-content input-price" placeholder="입력하세요"/>
            </div>
        </div>
        <button class="save-button-large"><i class="wci wci-check"></i></button>
    </div>
  </div>
  `;
};
export default MainTab;
