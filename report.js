
export function printReport(pageCounterObj){
    console.log('\n\n\n\n')
    console.log('==================================================================')
    console.log('====================\nStarting the report\n====================')
    console.log('==================================================================')
    console.log('\n\n\n\n')

    const pageCounterObjSorted = sortPageObj(pageCounterObj)

    for (let page in pageCounterObjSorted){
        console.log(`Found ${pageCounterObjSorted[page]} internal links to ${page}`)

    }
}

function sortPageObj(pageCounterObj){
    const pageCounterSorted = Object.entries(pageCounterObj)
    // Sort the array based on the values
    .sort((a, b) => {
      if (a[1] > b[1]) return -1;
      if (a[1] < b[1]) return 1;
      return 0;
    });

  // Convert the sorted array back into an object
  const pageCounterObjSorted = Object.fromEntries(pageCounterSorted);
  
  return pageCounterObjSorted;

}