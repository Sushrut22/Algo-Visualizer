var barsContainer = document.getElementById("bars-container");
var descriptionContainer = document.getElementById("description-container");
var bars = [];

// Generates random bars of varying heights
function generateBars() {
  barsContainer.innerHTML = "";
  bars = [];
  for (var i = 0; i < 50; i++) {
    var height = Math.floor(Math.random() * 400) + 10;
    var bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = height + "px";
    barsContainer.appendChild(bar);
    bars.push(height);
  }
}

// Swaps two bars in the array with animation
function swapWithAnimation(i, j) {
  return new Promise((resolve) => {
    setTimeout(() => {
      var tempHeight = bars[i];
      bars[i] = bars[j];
      bars[j] = tempHeight;

      var tempBar = barsContainer.children[i];
      barsContainer.insertBefore(barsContainer.children[j], tempBar);
      barsContainer.insertBefore(tempBar, barsContainer.children[j + 1]);

      resolve();
    }, 100);
  });
}

// Updates the description of the current step
function updateDescription(text) {
  var description = document.createElement("div");
  description.innerText = text;
  descriptionContainer.appendChild(description);
}

// Bubble sort algorithm
async function bubbleSort() {
  var len = bars.length;
  var i, j;
  for (i = 0; i < len - 1; i++) {
    for (j = 0; j < len - i - 1; j++) {
      var bar1 = barsContainer.children[j];
      var bar2 = barsContainer.children[j + 1];

      bar1.style.backgroundColor = "#FF4136"; // Highlight the bars being compared
      bar2.style.backgroundColor = "#FF4136";

      if (bars[j] > bars[j + 1]) {
        await swapWithAnimation(j, j + 1);
      }

      bar1.style.backgroundColor = "#007BFF"; // Reset the color
      bar2.style.backgroundColor = "#007BFF";
    }
    updateDescription(`Bubble Sort: Iteration ${i + 1} complete.`);
  }

  // Sorting complete
  var allBars = barsContainer.children;
  for (var k = 0; k < allBars.length; k++) {
    allBars[k].style.backgroundColor = "#28A745"; // Highlight the sorted bars
  }
  updateDescription("Bubble Sort: Sorting complete.");
}

// Selection sort algorithm
async function selectionSort() {
  var len = bars.length;
  var i, j, minIdx;
  for (i = 0; i < len - 1; i++) {
    minIdx = i;
    for (j = i + 1; j < len; j++) {
      var bar1 = barsContainer.children[minIdx];
      var bar2 = barsContainer.children[j];

      bar1.style.backgroundColor = "#FF4136"; // Highlight the minimum bar
      bar2.style.backgroundColor = "#FF4136";

      if (bars[j] < bars[minIdx]) {
        minIdx = j;
      }
    }

    await swapWithAnimation(i, minIdx);

    bar1.style.backgroundColor = "#007BFF"; // Reset the color
    bar2.style.backgroundColor = "#007BFF";
    updateDescription(
      `Selection Sort: Swapped element at index ${i} with the minimum element.`
    );
  }

  // Sorting complete
  var allBars = barsContainer.children;
  for (var k = 0; k < allBars.length; k++) {
    allBars[k].style.backgroundColor = "#28A745"; // Highlight the sorted bars
  }
  updateDescription("Selection Sort: Sorting complete.");
}

// Insertion sort algorithm
async function insertionSort() {
  var len = bars.length;
  var i, j, key;
  for (i = 1; i < len; i++) {
    key = bars[i];
    j = i - 1;

    var keyBar = barsContainer.children[i];
    keyBar.style.backgroundColor = "#FF4136"; // Highlight the key bar

    while (j >= 0 && bars[j] > key) {
      var currentBar = barsContainer.children[j];

      currentBar.style.backgroundColor = "#FFDC00"; // Highlight the current bar

      await swapWithAnimation(j, j + 1);

      currentBar.style.backgroundColor = "#007BFF"; // Reset the color
      j--;
    }

    keyBar.style.backgroundColor = "#007BFF"; // Reset the color

    bars[j + 1] = key;
    updateDescription(
      `Insertion Sort: Inserted element ${key} at index ${j + 1}.`
    );
  }

  // Sorting complete
  var allBars = barsContainer.children;
  for (var k = 0; k < allBars.length; k++) {
    allBars[k].style.backgroundColor = "#28A745"; // Highlight the sorted bars
  }
  updateDescription("Insertion Sort: Sorting complete.");
}

// Merge sort algorithm
async function mergeSort() {
  await mergeSortRecursive(0, bars.length - 1);
}

async function mergeSortRecursive(low, high) {
  if (low < high) {
    var mid = Math.floor((low + high) / 2);
    await mergeSortRecursive(low, mid);
    await mergeSortRecursive(mid + 1, high);
    await merge(low, mid, high);
  }
}

async function merge(low, mid, high) {
  var left = bars.slice(low, mid + 1);
  var right = bars.slice(mid + 1, high + 1);
  var leftLen = left.length;
  var rightLen = right.length;
  var i = 0;
  var j = 0;
  var k = low;

  var leftBars = barsContainer.children;
  var rightBars = barsContainer.children;

  while (i < leftLen && j < rightLen) {
    var leftBar = leftBars[low + i];
    var rightBar = rightBars[mid + 1 + j];

    leftBar.style.backgroundColor = "#FF4136"; // Highlight the left bar
    rightBar.style.backgroundColor = "#FF4136"; // Highlight the right bar

    if (left[i] <= right[j]) {
      bars[k] = left[i];
      i++;
    } else {
      bars[k] = right[j];
      j++;
    }

    await delay(100);
    updateBars();

    leftBar.style.backgroundColor = "#007BFF"; // Reset the color
    rightBar.style.backgroundColor = "#007BFF";

    k++;
  }

  while (i < leftLen) {
    var leftBar = leftBars[low + i];
    leftBar.style.backgroundColor = "#FF4136"; // Highlight the left bar

    bars[k] = left[i];
    i++;
    k++;

    await delay(100);
    updateBars();

    leftBar.style.backgroundColor = "#007BFF"; // Reset the color
  }

  while (j < rightLen) {
    var rightBar = rightBars[mid + 1 + j];
    rightBar.style.backgroundColor = "#FF4136"; // Highlight the right bar

    bars[k] = right[j];
    j++;
    k++;

    await delay(100);
    updateBars();

    rightBar.style.backgroundColor = "#007BFF"; // Reset the color
  }
  updateDescription(
    `Merge Sort: Merged sub-arrays [${low}-${mid}] and [${mid + 1}-${high}].`
  );
}

// Quick sort algorithm
async function quickSort() {
  await quickSortRecursive(0, bars.length - 1);
}

async function quickSortRecursive(low, high) {
  if (low < high) {
    var pivotIdx = await partition(low, high);
    await quickSortRecursive(low, pivotIdx - 1);
    await quickSortRecursive(pivotIdx + 1, high);
  }
}

async function partition(low, high) {
  var pivot = bars[high];
  var i = low - 1;
  for (var j = low; j < high; j++) {
    var currentBar = barsContainer.children[j];

    currentBar.style.backgroundColor = "#FF4136"; // Highlight the current bar

    if (bars[j] < pivot) {
      i++;
      await swapWithAnimation(i, j);
    }

    currentBar.style.backgroundColor = "#007BFF"; // Reset the color
  }

  await swapWithAnimation(i + 1, high);

  var pivotBar = barsContainer.children[high];
  pivotBar.style.backgroundColor = "#007BFF"; // Reset the color

  return i + 1;
}

// Updates the bars with their new heights and values
function updateBars() {
  barsContainer.innerHTML = "";
  for (var i = 0; i < bars.length; i++) {
    var bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = bars[i] + "px";
    bar.setAttribute("data-value", bars[i]); // Add data-value attribute
    barsContainer.appendChild(bar);
  }
}

// Delay function for animation
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Clear the description container
function clearDescription() {
  descriptionContainer.innerHTML = "";
}
