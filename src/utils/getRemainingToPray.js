export const arabicPrayers = [
    "الفجر",
    "الشروق",
    "الظهر",
    "العصر",
    "المغرب",
    "العشاء",
];
export function getRemainingToPray(currentPray, nextPrayTime) {
    const [hours1, hours2] = [+currentPray, +nextPrayTime.split(":")[0]];
    const mins = new Date().getMinutes();
    console.log(`${hours2 - hours1} Hour and ${+nextPrayTime.split(":")[1] - mins} Minutes`); // mins to next hour
    return {
        hours: hours2 - hours1,
        minutes: +nextPrayTime.split(":")[1] - mins,
    };
}
