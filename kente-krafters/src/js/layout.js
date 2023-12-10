let CURRENT_SUB_MENU = "background";
const TAB_BUTTONS = document.querySelectorAll(".tab-button");
const MENU_BUTTONS = document.querySelectorAll('[data-type="menu-trigger"]');

MENU_BUTTONS.forEach(button => {
  button.onclick = () => {
    ShowSubMenu(button.dataset.menu);
  };
});

TAB_BUTTONS.forEach(tabButton => {
  let siblingButton =
    tabButton.nextElementSibling || tabButton.previousElementSibling;

  tabButton.onclick = () => {
    siblingButton.classList.remove("selected");
    tabButton.classList.add("selected");

    const menu = document.querySelector(
      `div[data-submenu_section="${tabButton.dataset.target}"]`
    );
    menu.style.display = "inline-block";

    const otherMenu = document.querySelector(
      `div[data-submenu_section="${siblingButton.dataset.target}"]`
    );
    otherMenu.style.display = "none";
  };
});

function ShowSubMenu(subMenuID) {
  if (subMenuID !== CURRENT_SUB_MENU) {
    const menuToShow = document.querySelector(
      `div.sub-menu-container[data-submenu="${subMenuID}"]`
    );
    menuToShow.classList.add("active");

    const menuToHide = document.querySelector(
      `div.sub-menu-container[data-submenu="${CURRENT_SUB_MENU}"]`
    );
    menuToHide.classList.remove("active");

    const buttonToHighlight = document.querySelector(
      `div.menu-item[data-menu="${subMenuID}"]`
    );
    buttonToHighlight.classList.add("selected");

    const buttonToUnhighlight = document.querySelector(
      `div.menu-item[data-menu="${CURRENT_SUB_MENU}"]`
    );
    buttonToUnhighlight.classList.remove("selected");

    CURRENT_SUB_MENU = subMenuID;
  }
}

// Checkout Overlay
const overlay = document.getElementById("checkout-overlay");
const overlayCloseButton = document.getElementById("close-checkout");
const imagePreview = document.getElementById("previewImage");
const checkoutTable = document.getElementById("checkout-table");

document.querySelector('div[data-menu="checkout"').onclick = () => {
  if (overlay.style.display == "block") {
    overlay.style.display = "none";
  } else {
    ShowCheckout();
  }
};

overlayCloseButton.onclick = () => {
  CloseCheckout();
};

function RenderPriceTable() {
  if (Object.keys(CHECKOUT).length > 0) {
    const quantity = parseInt(document.getElementById("order-quantity").value);
    const pricing = GetPricing(CHECKOUT, quantity);

    let html = "<span><strong>Price Per Stole</strong></span>";

    Object.keys(pricing).forEach(category => {
      const content = `
				<tr> 
					<td>
						${category}
					</td>
					<td class="text-right">
						$${pricing[category].toFixed(2)}
					</td>
				</tr>
			`;
      html += content;
    });

    const totalPrice = parseFloat(quantity * pricing.total).toFixed(2);

    html += `<tr><td><br/></td></tr>
      <tr>
        <td>
          <strong>Shipping</strong>
        </td>
        <td class="text-right">
        $00.00
        </td>
      </tr> 
      <tr> 
      <td>
        <strong>Quantity</strong>
      </td>
      <td class="text-right">
        <span id="order-quantity-label">${quantity}</span> item(s) 
      </td>
    </<tr>
    <tr> 
      <td>
        <strong>Final Price</strong>
      </td>
      <td class="text-right">
        $<span id="order-quantity-label">${totalPrice}</span>
      </td>
    </tr>
    `;

    checkoutTable.innerHTML = html;
  }
}

function ShowCheckout() {
  overlay.style.display = "block";
  PREVIEW_IMAGE = canvas.toDataURL("image/png", { multiplier: 3 });
  imagePreview.src = PREVIEW_IMAGE;
  RenderPriceTable();
}

function CloseCheckout() {
  overlay.style.display = "none";
}

// Event listener for the Quantity field
document.getElementById("order-quantity").onchange = function(e) {
  RenderPriceTable();
};

// Modal Operations
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeButton = document.querySelector(".modal-close");
const modalText = document.querySelector("#modal-text");
const modalSubText = document.querySelector("#modal-subtext");

function ShowAlert(content, type, subcontent = "") {
  if (type == "info") {
    modalContent.style.backgroundColor = "#71dc7e";
  } else if (type == "warning") {
    modalContent.style.backgroundColor = "#dc7171";
  }
  modalText.textContent = content;
  modalSubText.textContent = subcontent;
  modal.classList.add("show-modal");
}

closeButton.onclick = function(e) {
  modal.classList.toggle("show-modal");
};
