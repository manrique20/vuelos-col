<script setup lang="ts">
import { number } from "@intlify/core-base";

/**Stores */
const vehicleTypesStore = useVehicleTypesStore();
const store = useOnboardingStore();
const { getOneDriverDetail: detail, getClickingInfo: click } =
  storeToRefs(vehicleTypesStore);
const { getLoginUser: userData } = storeToRefs(store);
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const showDialog = ref(false);
const showPersonalDriverInfo = ref(false);
const localePath = useLocalePath();
const ratingValue = ref(0);
const driverNumber = ref("");
const listRoutes = computed(() => [
  {
    text: t("breadcrumb.vehicleList"),
    url: localePath({ name: "home" }),
  },
  {
    text: useSearchItemJson("driverName", detail.value),
    url: route.path,
  },
]);

const getData = async () => {
  useLoading(true);
  await vehicleTypesStore.getDriverDetail(route.params.id);
  if (userData?.value?.id) {
    await vehicleTypesStore.checkIfClicked(Number(detail.value.idDriver));
    if (click.value.hasViewed) {
      ratingValue.value = click.value.lastRating
        ? click.value.lastRating.value
        : 0;
    }
  }
  useLoading(false);
};
const getDriverInfo = async () => {
  useLoading(true);
  const response = await vehicleTypesStore.getInfoDriver({
    driverId: detail.value.idDriver.toString(),
    vehicleId: detail.value.id.toString(),
    typeId: detail.value.vehicleTypeId,
  });
  useLoading(false);
  if (response.status && response.code === 100) {
    showPersonalDriverInfo.value = true;
    driverNumber.value = response.data.phoneNumber;
    getData();
  } else {
    useShowAlert({
      type: "error",
      message: response.message,
    });
  }
};
const openWhatsApp = () => {
  const cleanNumber = driverNumber.value.replace(/\D/g, "");

  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  window.open(whatsappUrl, "_blank");
};

const makeCall = () => {
  window.location.href = `tel:${driverNumber.value}`;
};
watch(
  () => ratingValue.value,
  async (newVal) => {
    if (newVal > 0 && !click.value.hasRated) {
      await vehicleTypesStore.rateDriver({
        driverId: detail.value.idDriver.toString(),
        rating: newVal,
      });
      getData();
    }
  }
);
onMounted(() => {
  nextTick(() => {
    getData();
  });
});
</script>

<template>
  <div class="content-page">
    <GeneralBreadCrumb :routes="listRoutes" />
    <div class="flex justify-content-center flex-column md:flex-row mt-3 gap-5">
      <Card class="general-card detail vehicle">
        <template #header>
          <img
            alt="vehicle"
            class="vehicle-img"
            :src="useSearchItemJson('vehiclePhotoUrl', detail)"
          />
          <img
            :src="useSearchItemJson('driverPhotoUrl', detail)"
            alt="profile"
            class="driver-img"
          />
        </template>
        <template #content>
          <div class="flex flex-column align-items-center gap-1">
            <span class="card-subtitles text-center">
              {{ t("home.carDetail.greeting")
              }}{{ useSearchItemJson("driverName", detail) }} !
            </span>
            <p class="text-center">
              {{ getActiveTime(useSearchItemJson("activeHours", detail)) }}
              {{ t("home.carDetail.active") }}
            </p>
          </div>
          <span class="general-rating">
            <Rating
              :defaultValue="useSearchItemJson('averageRating', detail)"
              disabled
            />
          </span>
        </template>
      </Card>
      <Card class="general-card detail owner">
        <template #content>
          <div class="flex flex-column gap-3">
            <span class="card-subtitles">
              {{ t("home.carDetail.detail") }}
            </span>
            <div class="flex justify-content-between gap-2">
              <p class="text-s-black">{{ t("home.carDetail.plate") }}</p>
              <p style="font-size: 14px !important">
                {{ detail.plate }}
              </p>
            </div>
            <div class="flex justify-content-between gap-2">
              <p class="text-s-black">{{ t("home.vehicleCard.type") }}:</p>
              <p style="font-size: 14px !important">
                {{ detail.vehicleTypeName }}
              </p>
            </div>
            <div class="flex justify-content-between gap-2">
              <p class="text-s-black">
                {{ t("home.vehicleCard.dimensions") }}:
              </p>
              <p style="font-size: 14px !important">
                {{
                  t("home.vehicleCard.dimensionsData", {
                    height: useSearchItemJson("dimensions.height", detail),
                    width: useSearchItemJson("dimensions.width", detail),
                    large: useSearchItemJson("dimensions.length", detail),
                  })
                }}:
              </p>
            </div>
            <div class="flex justify-content-between gap-2">
              <p class="text-s-black">{{ t("home.vehicleCard.weigth") }}:</p>
              <p style="font-size: 14px !important">
                {{ useCalculateWeigth(detail.weight) }}
              </p>
            </div>
            <div class="flex justify-content-between gap-2">
              <p class="text-s-black">{{ t("home.vehicleCard.space") }}:</p>
              <p style="font-size: 14px !important">
                <img
                  src="/icons/ic_box.svg"
                  alt="ic_box"
                  height="15px"
                  width="15px"
                />
                {{ detail.capacityDescription }}
              </p>
            </div>
          </div>
          <div class="flex flex-column gap-3">
            <span class="card-subtitles mt-5">
              {{ t("home.carDetail.serviceDetail.title") }}
            </span>
            <div class="flex justify-content-between gap-2">
              <p class="text-s-black">
                {{ t("home.carDetail.serviceDetail.min") }}
              </p>
              <p style="font-size: 14px !important">
                {{
                  t("home.carDetail.serviceDetail.to", {
                    hours: useSearchItemJson("minHours", detail),
                    price: useFormatPrice(useSearchItemJson("minCost", detail)),
                  })
                }}
              </p>
            </div>
            <div class="flex justify-content-between gap-2">
              <p class="text-s-black">
                {{ t("home.carDetail.serviceDetail.add") }}
              </p>
              <p style="font-size: 14px !important">
                {{
                  useFormatPrice(useSearchItemJson("extraMinuteCost", detail))
                }}
              </p>
            </div>
          </div>
          <div
            v-if="useSearchItemJson('serviceConditions', detail)"
            class="flex flex-column gap-3"
          >
            <span class="card-subtitles mt-5">
              {{ t("home.carDetail.conditions") }}
            </span>
            <p style="font-size: 14px !important">
              {{ useSearchItemJson("serviceConditions", detail) }}
            </p>
          </div>
          <div class="flex justify-content-center mt-5">
            <Button
              :label="t('button.contact')"
              style="min-width: 185px"
              class="app-general-button app-btn-primary"
              type="button"
              @click="userData?.id ? getDriverInfo() : (showDialog = true)"
            />
          </div>
        </template>
      </Card>
      <Card v-if="userData?.id && click.hasViewed" style="max-height: 113px">
        <template #content>
          <div class="flex flex-column gap-3">
            <span class="subtitles">
              {{ t("home.vehicleCard.rating") }}
            </span>
            <span class="general-rating">
              <Rating v-model="ratingValue" :disabled="click.hasRated" />
            </span>
          </div>
        </template>
      </Card>
    </div>
    <GeneralDialog
      v-if="showDialog"
      v-model:show="showDialog"
      width="559px"
      :title="t('home.carDetail.modal.title')"
      :closable="true"
    >
      <div class="content-dialog">
        <p>
          {{ t("home.carDetail.modal.description") }}
        </p>
      </div>
      <div class="action-buttons">
        <Button
          :label="t('button.haveAccount')"
          style="min-width: 151px"
          class="app-general-button app-btn-disabled"
          type="button"
          @click="router.push(localePath({ name: 'login' }))"
        />
        <Button
          :label="t('button.yes')"
          style="min-width: 151px"
          class="app-general-button app-btn-primary"
          type="button"
          @click="router.push(localePath({ name: 'register' }))"
        />
      </div>
    </GeneralDialog>
    <GeneralDialog
      v-if="showPersonalDriverInfo"
      v-model:show="showPersonalDriverInfo"
      width="559px"
      :title="
        t('home.carDetail.personalDriverInfo.title', {
          name: useSearchItemJson('driverName', detail),
        })
      "
      :closable="true"
    >
      <div
        class="content-dialog flex justify-content-center flex-column align-items-center"
      >
        <p class="text">
          {{ t("home.carDetail.personalDriverInfo.message") }}
        </p>
        <strong class="subtitles">
          {{ driverNumber }}
        </strong>
      </div>
      <div class="action-buttons">
        <Button
          :label="t('button.whatsapp')"
          style="min-width: 151px"
          class="app-general-button app-btn-disabled"
          type="button"
          @click="openWhatsApp()"
        />
        <Button
          :label="t('button.phone')"
          style="min-width: 151px"
          class="app-general-button app-btn-primary"
          type="button"
          @click="makeCall()"
        />
      </div>
    </GeneralDialog>
  </div>
</template>
