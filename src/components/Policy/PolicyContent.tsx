import React from 'react';
import { View, Text } from 'react-native';

export interface PolicyData {
  title?: string;
  contents: string[];
}

interface Props {
  policyData: PolicyData[];
}

const PolicyContent = ({ policyData }: Props) => {
  return (
    <View className="space-y-[8px]">
      {policyData.map((item, index) => (
        <View key={index} className="space-y-[8px]">
          {item.title && <Text className="text-sm text-black900 font-PTDSemiBold">{item.title}</Text>}
          {
            <View className="space-y-[8px]">
              {item.contents.map((paragraph, i) => (
                <Text key={i} className="text-sm text-black900 font-PTDLight">
                  {paragraph}
                </Text>
              ))}
            </View>
          }
        </View>
      ))}
    </View>
  );
};

export default PolicyContent;
