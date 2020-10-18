<template>
    <section class="transaction">
        <div class="transaction__buttons">
            <button class="transaction__button transaction__button-green" @click.prevent="onStartGetMessages">
                Запуск
            </button>
            <button class="transaction__button transaction__button-red" @click.prevent="onStopGetMessages">
                Остановка
            </button>
            <button class="transaction__button transaction__button-orange" @click.prevent="onClearMessages">
                Сброс
            </button>
            <p class="transaction__value " title="Сумма транзакций">{{allValues / 100000000 }} BTC</p>
        </div>



        <div class="transaction__blocks" v-if="messages.length >0">
            <div class="transaction__line">
                <div class="transaction__block">
                    <span class="transaction__title-big">ОТКУДА:</span>
                </div>

                <div class="transaction__block">
                    <span class="transaction__title-big">КУДА:</span>
                </div>
                <div class="transaction__block">
                    <span class="transaction__title-big">BTC:</span>
                </div>
            </div>
        </div>

 <div class="transaction__blocks" v-if="messages.length >0">
       
        <div class="transaction__line" v-for="message in messages" :key="message.id">
              
                <div class="transaction__block" >
                    <span class="transaction__title" title="Адрес отправителя" v-for="input in message.x.inputs" :key="input.id">{{ input.prev_out.addr }}</span>
                </div>

                <div class="transaction__block" >
                    <span class="transaction__title" title="Адрес получателя" v-for="out in message.x.out" :key="out.id">{{ out.addr }}</span>
                </div>

                <div class="transaction__block" >
                    <span class="transaction__title" title="Сумма" v-for="out in message.x.out" :key="out.id" >{{ out.value / 100000000}}</span>
                </div>
    </div> 
        </div>
    </section>
</template>

<script>
    export default {
        name: "PageTransaction",
        metaInfo: {
            title: "Транзакции",
            titleTemplate: null
        },
        data() {
            return {
                
            };
        },
        computed: {
            messages() {
                return this.$store.getters.getMessages;
            },
            allValues() {
                return this.$store.getters.getAllMessagesValues;
            }
        },

        methods: {
            onStartGetMessages() {
                this.$store.dispatch("START_SUBSCRIBE");
            },
            onStopGetMessages() {
                this.$store.dispatch("STOP_SUBSCRIBE");
            },
            onClearMessages() {
                this.$store.commit("CLEAR_MESSAGES");
            },
        }
    };
</script>

<style lang="scss" scoped>
    .transaction {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid $color-border;
        width: 1000px;
        max-height: 600px;
        padding: 20px;
        overflow-y: hidden;
        &__blocks {
            width: 100%;
            margin-bottom: 20px;
            
        }

        &__line {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 4px;
            margin-top: 4px;
            margin-bottom: 4px;
            border: 1px solid $color-bckg1;
            &:hover {
                box-shadow: 0px 0px 6px $color-bckg1;
            }
        }

        &__title {
            font-family: $font;
            font-size: 10px;
            color: $font-color;
            &-big {
                font-size: 14px;
            }
        }
        &__block {
            width: 300px;
            font-size: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: c;
        }
        &__buttons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
        }

        &__value {
                color: $color-bckg2;
                
                cursor: default;
                font-family: $font;
            
            padding: 4px;
            margin: 4px;
            padding-left: 12px;
            padding-right: 12px;
            background: white;
            border: 1px solid $color-bckg2;
            font-family: $font;
            font-size: 14px;
            border-radius: 4px;
            }
        &__button {
            font-family: $font;
            color: $color-white;
            cursor: pointer;
            padding: 4px;
            margin: 4px;
            padding-left: 12px;
            padding-right: 12px;
            background: white;
            border: 1px solid transparent;
            font-family: $font;
            font-size: 14px;
            border-radius: 4px;

            &:hover {
                box-shadow: 0px 0px 2px $font-color;
            }

            &-red {
                background: $color-red;
            }

            &-green {
                background: $color-green;
            }

            &-orange {
                background: $color-orange;
            }
            
        }
    }
    
    .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
    .fade-leave-to

    /* .fade-leave-active до версии 2.1.8 */
 {
  opacity: 0;
}
</style>