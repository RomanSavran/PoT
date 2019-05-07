export const equipments = (doc) => {
    let resultDoc = {};

    try {
        resultDoc = {
            name: Reflect.get(doc, 'Name') || null,
            equipmentType: Reflect.get(doc, 'EquipmentType') || null,
            equipmentTypeName: doc.EquipmentType ? Reflect.get(doc.EquipmentType, 'Name') || null : null,
            equipmentTypeId: doc.EquipmentType ? Reflect.get(doc.EquipmentType, 'Id') || null : null,
            constructionSite: doc.ConstructionSite ? Reflect.get(doc.ConstructionSite, 'Name') || null : null,
            invoiceGroup: Reflect.get(doc, 'InvoiceGroup') || null,
            resourceGroups: Reflect.get(doc, 'ResourceGroup') || null,
            transferDate: Reflect.get(doc, 'TransferDate') || null,
            reservationEndDate: Reflect.get(doc, 'ReservationEndDate') || null,
            utilization: Reflect.get(doc, 'Utilization') || null,
            address: Reflect.get(doc, 'StreetAddress') || null,
            eqId: Reflect.get(doc, 'EquipmentId') || null,
            selected: false,
            Id: doc.Id || ''
        };

    }catch (err) {
        console.log('parse equipments response error: ', err);
    }

    return resultDoc;
};

